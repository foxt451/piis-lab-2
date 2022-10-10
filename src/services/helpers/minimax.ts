import { EnemyInfo } from "../../types/enemy";
import { HeroInfo } from "../../types/hero";
import { CellCoords, MazeCell, MazeInfo } from "../../types/maze";
import { areCellsEqual } from "./are-cells-equal";
import { getCellAllManhattanNeighbours } from "./get-cell-neighbours";

// min is for enemies
export const min = (
  maze: MazeInfo,
  enemies: EnemyInfo[],
  hero: HeroInfo,
  alpha: number,
  beta: number,
  depth: number
): {
  score: number;
  // the id of the enemy and the position they have to move to, in order to achieve the best result
  move:
    | {
        enemyId: string;
        moveTo: CellCoords;
      }[]
    | null;
} => {
  const staticEvaluation = evaluationFunc(maze, enemies, hero);
  if (depth === 0 || staticEvaluation.isFinite) {
    return {
      move: null,
      score: staticEvaluation.score,
    };
  }
  // generate all possible branches from this one and explore them
  let minV = +Infinity;
  let bestEnemyMoves:
    | {
        enemyId: string;
        moveTo: CellCoords;
      }[]
    | null = null;
  const branches = generateBranches(maze, hero, enemies, false);
  for (const branch of branches) {
    const branchResult = max(
      maze,
      branch.enemies,
      branch.hero,
      alpha,
      beta,
      depth - 1
    );
    if (branchResult.score < minV) {
      minV = branchResult.score;
      if (minV <= alpha) {
        break;
      }
      beta = Math.min(beta, minV);
      bestEnemyMoves = branch.enemies.map((enemy) => ({
        enemyId: enemy.id,
        moveTo: enemy.position,
      }));
    }
  }
  return {
    move: bestEnemyMoves,
    score: minV,
  };
};

// max is for the hero
export const max = (
  maze: MazeInfo,
  enemies: EnemyInfo[],
  hero: HeroInfo,
  alpha: number,
  beta: number,
  depth: number
): {
  score: number;
  move: CellCoords | null;
} => {
  const staticEvaluation = evaluationFunc(maze, enemies, hero);
  if (depth === 0 || staticEvaluation.isFinite) {
    return {
      move: null,
      score: staticEvaluation.score,
    };
  }
  // generate all possible branches from this one and explore them
  let maxV = -Infinity;
  let bestHeroMove: CellCoords | null = null;
  const branches = generateBranches(maze, hero, enemies, true);

  for (const branch of branches) {
    const branchResult = min(
      maze,
      branch.enemies,
      branch.hero,
      alpha,
      beta,
      depth - 1
    );
    if (branchResult.score > maxV) {
      maxV = branchResult.score;
      if (maxV >= beta) {
        break;
      }
      alpha = Math.max(alpha, maxV);
      bestHeroMove = branch.hero.position;
    }
  }
  return {
    score: maxV,
    move: bestHeroMove,
  };
};

const evaluationFunc = (
  maze: MazeInfo,
  enemies: EnemyInfo[],
  hero: HeroInfo
): { isFinite: boolean; score: number } => {
  if (enemies.some((enemy) => areCellsEqual(enemy.position, hero.position))) {
    return { isFinite: true, score: -10_000 + hero.cellsCoveredNum };
  }
  if (maze.freeCellsNum <= hero.cellsCoveredNum) {
    return { isFinite: true, score: 10_000 };
  }

  let visitPenalty = 0;
  
  for (const row of hero.cellsCovered) {
    for (const count of row) {
      visitPenalty += count * count * count;
    }
  }


  return {
    isFinite: false,
    score:
      hero.cellsCoveredNum * 10 -
      visitPenalty / 10000,
  };
};

const generateBranches = (
  maze: MazeInfo,
  hero: HeroInfo,
  enemies: EnemyInfo[],
  isHeroMoving: boolean
): {
  hero: HeroInfo;
  enemies: EnemyInfo[];
}[] => {
  let branches: {
    hero: HeroInfo;
    enemies: EnemyInfo[];
  }[] = [];
  if (isHeroMoving) {
    const freeCellsAround = getCellAllManhattanNeighbours(
      maze.height,
      maze.width,
      hero.position
    ).filter((cell) => maze.field[cell.y][cell.x] === MazeCell.EMPTY);
    for (const cell of freeCellsAround) {
      const newCellsCovered = hero.cellsCovered.map((row) => [...row]);
      let shouldUpdateCoveredNum = !newCellsCovered[cell.y][cell.x];
      newCellsCovered[cell.y][cell.x]++;
      branches.push({
        hero: {
          ...hero,
          cellsCovered: newCellsCovered,
          cellsCoveredNum:
            hero.cellsCoveredNum + (shouldUpdateCoveredNum ? 1 : 0),
          position: cell,
        },
        enemies,
      });
    }
  } else {
    // assuming all enemies make a move simultaneously
    const possibleEnemyMoves: CellCoords[][] = enemies.map((enemy) => {
      const freeCellsAround = getCellAllManhattanNeighbours(
        maze.height,
        maze.width,
        enemy.position
      ).filter((cell) => maze.field[cell.y][cell.x] === MazeCell.EMPTY);
      return freeCellsAround;
    });
    let enemyNewPositions: CellCoords[][] = possibleEnemyMoves[0].map((pos) => [
      pos,
    ]);
    for (let i = 1; i < possibleEnemyMoves.length; i++) {
      for (
        let j = 0;
        j < enemyNewPositions.length;
        j += possibleEnemyMoves[i].length
      ) {
        enemyNewPositions.splice(
          j,
          1,
          ...possibleEnemyMoves[i].map((newMove) => [
            ...enemyNewPositions[j],
            newMove,
          ])
        );
      }
    }
    for (const newPos of enemyNewPositions) {
      branches.push({
        hero,
        enemies: enemies.map((enemy, index) => ({
          ...enemy,
          position: newPos[index],
        })),
      });
    }
  }
  return branches;
};
