import { AntagonistInfo } from "../../controllers/game/types/antagonist";
import { Direction } from "../../controllers/game/types/direction";
import { CellCoords, MazeCell, MazeInfo } from "../../types/maze";
import { getCellAllNeighbours } from "./helpers/get-cell-neigbours";

export class AntagonistService {
  findInitialAntagonistPos(maze: MazeInfo): AntagonistInfo {
    // start from ceter and circle around, until an empty spot is found
    const initPos: CellCoords = { y: Math.floor(maze.height / 2), x: Math.floor(maze.width / 2) };

    const visitedCells: boolean[][] = maze.field.map((row) =>
      row.map(() => false)
    );

    visitedCells[initPos.y][initPos.x] = true;
    const queue: CellCoords[] = [initPos];
    while (queue.length > 0) {
      const curPos = queue.shift() as CellCoords;
      if (maze.field[curPos.y][curPos.x] === MazeCell.EMPTY) {
        return {
          position: curPos,
          direction: Direction.UP,
        };
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
      position: {
        x: 1,
        y: 1,
      },
      direction: Direction.DOWN,
    };
  }
}
