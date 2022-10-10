import { CellCoords, MazeCell, MazeInfo } from "../../types/maze";
import { getCellAllNeighbours } from "./get-cell-neighbours";

export const findFreeAround = (startPos: CellCoords, maze: MazeInfo): CellCoords => {
  // start from ceter and circle around, until an empty spot is found
    const initPos: CellCoords = startPos;

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