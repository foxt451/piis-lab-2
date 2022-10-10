import FastPriorityQueue from "fastpriorityqueue";
import { CellCoords, MazeCell, MazeInfo } from "../../types/maze";
import { Path } from "../../types/path";
import { getCellAllManhattanNeighbours } from "./get-cell-neighbours";

type CellInQueue = {
  cell: CellCoords;
  f: number;
  predecessor: CellInQueue | null;
};

export const constructPathAStar = (
  maze: MazeInfo,
  start: CellCoords,
  exits: CellCoords[]
): Path | null => {
  const openSet = new FastPriorityQueue<CellInQueue>((a, b) => {
    return a.f < b.f;
  });
  const costSoFar: number[][] = maze.field.map((row) =>
    row.map(() => Infinity)
  );
  costSoFar[start.y][start.x] = 0;
  const closedSet: boolean[][] = maze.field.map((row) => row.map(() => false));

  openSet.add({
    cell: start,
    f: costSoFar[start.y][start.x] + calculateShortestPathHeuristic(start, exits),
    predecessor: null,
  });

  while (!openSet.isEmpty()) {
    const closest = openSet.poll() as CellInQueue;
    if (
      exits.some(
        (finish) => closest.cell.y === finish.y && closest.cell.x === finish.x
      )
    ) {
      return reconstructPath(closest);
    }
    closedSet[closest.cell.y][closest.cell.x] = true;
    const emptyNeighbours = getCellAllManhattanNeighbours(
      maze.height,
      maze.width,
      closest.cell
    ).filter(
      (cell) =>
        maze.field[cell.y][cell.x] !== MazeCell.WALL &&
        !closedSet[cell.y][cell.x]
    );
    for (const neighbour of emptyNeighbours) {
      const g = costSoFar[closest.cell.y][closest.cell.x] + 1;
      if (g < costSoFar[neighbour.y][neighbour.x]) {
        costSoFar[neighbour.y][neighbour.x] = g;
        openSet.add({
          cell: neighbour,
          f: g + calculateShortestPathHeuristic(neighbour, exits),
          predecessor: closest,
        });
      }
    }
  }

  // path not found
  return null;
};

const reconstructPath = (finish: CellInQueue): Path => {
  const path: Path = [];
  let curCell: CellInQueue | null = finish;
  while (curCell) {
    path.splice(0, 0, curCell.cell);
    curCell = curCell.predecessor;
  }
  return path;
};

// the heuristic would typically be calculated as the estimated shortest path to the goal
// since we have 4 goals at once, the heuristic will be the shortest of the estimated paths
const calculateShortestPathHeuristic = (a: CellCoords, exits: CellCoords[]): number => {
  let minH: number = Infinity;
  exits.forEach((exit) => {
    const h = Math.abs(a.x - exit.x) + Math.abs(a.y - exit.y);
    if (h < minH) {
      minH = h;
    }
  });
  return minH;
};
