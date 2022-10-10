import { EnemyInfo } from "../types/enemy";
import { CellCoords, MazeInfo } from "../types/maze";
import { constructPathAStar } from "./helpers/construct-path-a-star";
import { findFreeAround } from "./helpers/find-free-around";

export class EnemyService {
  private static DEFAULT_SPEED_CELLS_PER_SEC = 2;
  getEnemy(maze: MazeInfo, id: string, around: CellCoords): EnemyInfo {
    return {
      id,
      position: findFreeAround(
        around,
        maze
      ),
      speedCellsPerSec: EnemyService.DEFAULT_SPEED_CELLS_PER_SEC,
    };
  }

  getNextStepAStar(
    maze: MazeInfo,
    enemy: EnemyInfo,
    goal: CellCoords
  ): CellCoords | null {
    const path = constructPathAStar(maze, enemy.position, [goal]);
    return path?.[1] ?? null;
  }
}
