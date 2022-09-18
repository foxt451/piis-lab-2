import { getRandomElement } from "../../helpers/get-random-element";
import {
  CellCoords,
  InfoForMazeGeneration,
  MazeCell,
  MazeInfo,
} from "../../types/maze";
import { generateGridMaze } from "./helpers/generate-grid-maze";
import { getGridMazeCellEmptyNeighbours } from "./helpers/get-cell-neigbours";
import { makeRandomizedHoles } from "./helpers/make-randomized-holes";

export class MazeService {
  generateMaze(infoForMazeGeneration: InfoForMazeGeneration): MazeInfo {
    const { height, width } = infoForMazeGeneration;
    const gridMaze = generateGridMaze(height, width);
    const initialCell: CellCoords = { x: 1, y: 1 };
    const visitedCells: boolean[][] = gridMaze.map((row) =>
      row.map(() => false)
    );
    visitedCells[initialCell.y][initialCell.x] = true;
    const cellStack: CellCoords[] = [initialCell];
    while (cellStack.length > 0) {
      const cell = cellStack.pop() as CellCoords;
      const neighbours = getGridMazeCellEmptyNeighbours(height, width, cell);
      const unvisitedNeighbours = neighbours.filter(
        (neighbour) => !visitedCells[neighbour.y][neighbour.x]
      );
      if (unvisitedNeighbours.length > 0) {
        cellStack.push(cell);
        const randomNeighbour = getRandomElement(unvisitedNeighbours);
        gridMaze[(cell.y + randomNeighbour.y) / 2][
          (cell.x + randomNeighbour.x) / 2
        ] = MazeCell.EMPTY;
        visitedCells[randomNeighbour.y][randomNeighbour.x] = true;
        cellStack.push(randomNeighbour);
      }
    }
    gridMaze[0][1] =
      gridMaze[height - 1][width - 2] =
      gridMaze[0][width - 2] =
      gridMaze[height - 1][1] =
        MazeCell.FINISH;

    makeRandomizedHoles(gridMaze);
    return {
      field: gridMaze,
      height,
      width,
      exits: [
        { y: 0, x: 1 },
        { y: height - 1, x: width - 2 },
        { y: 0, x: width - 2 },
        { y: height - 1, x: 1 },
      ],
    };
  }
}
