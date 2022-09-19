import { CellCoords, MazeCell, MazeInfo } from "../../../types/game/maze";
import { Path } from "../../../types/game/path";
import { areCellsEqual } from "./are-cells-equal";
import { getCellAllManhattanNeighbours } from "./get-cell-neigbours";

export const constructPathLee = (
  maze: MazeInfo,
  start: CellCoords,
  exits: CellCoords[]
): Path | null => {
  // infinity means unvisited
  const distanceMatrix: number[][] = maze.field.map((row) =>
    row.map(() => Infinity)
  );
  distanceMatrix[start.y][start.x] = 0;
  const queue: CellCoords[] = [start];
  if (exits.some((exit) => areCellsEqual(start, exit))) {
    return null;
  }

  while (queue.length > 0) {
    const cell = queue.shift() as CellCoords;

    const unvisitedFreeNeigbours = getCellAllManhattanNeighbours(
      maze.height,
      maze.width,
      cell
    ).filter(
      (neighbour) =>
        distanceMatrix[neighbour.y][neighbour.x] === Infinity &&
        maze.field[neighbour.y][neighbour.x] !== MazeCell.WALL
    );
    for (const neighbour of unvisitedFreeNeigbours) {
      distanceMatrix[neighbour.y][neighbour.x] =
        distanceMatrix[cell.y][cell.x] + 1;
      queue.push(neighbour);
      if (exits.some((exit) => areCellsEqual(neighbour, exit))) {
        return reconstructPath(distanceMatrix, neighbour);
      }
    }
  }
  return null;
};

const reconstructPath = (
  distanceMatrix: number[][],
  finish: CellCoords
): Path => {
  const path: Path = [finish];
  let curCell = finish;
  while (distanceMatrix[curCell.y][curCell.x] !== 0) {
    const neighbours = getCellAllManhattanNeighbours(
      distanceMatrix.length,
      distanceMatrix[0].length,
      curCell
    ).filter(
      (neighbour) =>
        distanceMatrix[neighbour.y][neighbour.x] ===
        distanceMatrix[curCell.y][curCell.x] - 1
    );

    const nextPoint = neighbours[0];
    path.splice(0, 0, nextPoint);
    curCell = nextPoint;
  }
  return path;
};
