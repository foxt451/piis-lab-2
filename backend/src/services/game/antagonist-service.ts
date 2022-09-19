import { AntagonistInfo } from "../../types/game/antagonist";
import { CellCoords, MazeCell, MazeInfo } from "../../types/game/maze";
import { Path } from "../../types/game/path";
import { PathAlgo } from "../../types/game/path-algo";
import { constructPathAStar } from "./helpers/construct-path-a-star";
import { constructPathLee } from "./helpers/construct-path-lee";
import { getCellAllNeighbours } from "./helpers/get-cell-neigbours";

export class AntagonistService {
  public static readonly CELLS_PER_SECOND: number = 4;

  findInitialAntagonistInfo(maze: MazeInfo, algorithm: PathAlgo): AntagonistInfo {
    const initialPos = this.findInitialAntagonistPos(maze);
    const cellsCovered: boolean[][] = maze.field.map((row) =>
      row.map(() => false)
    );
    cellsCovered[initialPos.y][initialPos.x] = true;
    return {
      position: initialPos,
      constructedPath: this.constructPath(
        algorithm,
        maze,
        initialPos,
        maze.exits
      ),
      cellsPerSecond: AntagonistService.CELLS_PER_SECOND,
      cellsCovered,
    };
  }

  private findInitialAntagonistPos(maze: MazeInfo): CellCoords {
    // start from ceter and circle around, until an empty spot is found
    const initPos: CellCoords = {
      y: Math.floor(maze.height / 2),
      x: Math.floor(maze.width / 2),
    };

    const visitedCells: boolean[][] = maze.field.map((row) =>
      row.map(() => false)
    );

    visitedCells[initPos.y][initPos.x] = true;
    const queue: CellCoords[] = [initPos];
    while (queue.length > 0) {
      const curPos = queue.shift() as CellCoords;
      if (maze.field[curPos.y][curPos.x] === MazeCell.EMPTY) {
        return curPos;
      }
      const allNeighbours = getCellAllNeighbours(
        maze.height,
        maze.width,
        curPos
      );
      const unvisitedNeighbours = allNeighbours.filter(
        (neighbour) => !visitedCells[neighbour.y][neighbour.x]
      );
      for (const neighbour of unvisitedNeighbours) {
        queue.push(neighbour);
        visitedCells[neighbour.y][neighbour.x] = true;
      }
    }
    return {
      x: 1,
      y: 1,
    };
  }

  constructPath(
    algorithm: PathAlgo,
    maze: MazeInfo,
    start: CellCoords,
    exits: CellCoords[]
  ): Path | null {
    if (algorithm === "a-star") {
      return constructPathAStar(maze, start, exits);
    } else {
      return constructPathLee(maze, start, exits);
    }
  }
}
