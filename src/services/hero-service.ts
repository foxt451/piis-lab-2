import { EnemyInfo } from "../types/enemy";
import { HeroInfo } from "../types/hero";
import { CellCoords, MazeCell, MazeInfo } from "../types/maze";
import { findFreeAround } from "./helpers/find-free-around";
import { getCellAllNeighbours } from "./helpers/get-cell-neighbours";
import { max } from "./helpers/minimax";

export class HeroService {
  private static DEFAULT_SPEED_CELLS_PER_SEC = 3;

  findInitialHeroInfo(maze: MazeInfo): HeroInfo {
    const initialPos = this.findInitialHeroPos(maze);
    const cellsCovered: number[][] = maze.field.map((row) =>
      row.map(() => 0)
    );
    cellsCovered[initialPos.y][initialPos.x] = 1;
    return {
      position: initialPos,
      cellsCovered,
      speedCellsPerSec: HeroService.DEFAULT_SPEED_CELLS_PER_SEC,
      cellsCoveredNum: 1,
    };
  }

  private findInitialHeroPos(maze: MazeInfo): CellCoords {
    return findFreeAround(
      {
        y: Math.floor(maze.height / 2),
        x: Math.floor(maze.width / 2),
      },
      maze
    );
  }

  public getNextPos(
    maze: MazeInfo,
    heroInfo: HeroInfo,
    enemies: EnemyInfo[]
  ): CellCoords | null {
    const bestPos = max(maze, enemies, heroInfo, -Infinity, +Infinity, 10);
    return bestPos.move;
  }
}
