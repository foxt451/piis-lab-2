import {
  CellCoords,
  InfoForMazeGeneration,
  MazeCell,
  MazeInfo,
} from "../types/maze";
import { generateDottedMaze } from "./helpers/generate-dotted-maze";
import { generateGridMaze } from "./helpers/generate-grid-maze";
import { getGridMazeCellEmptyNeighbours } from "./helpers/get-cell-neighbours";
import { getRandomElement } from "./helpers/get-random-element";
import { makeRandomizedHoles } from "./helpers/make-randomized-holes";

export class MazeService {
  generateMaze(infoForMazeGeneration: InfoForMazeGeneration): MazeInfo {
    const { height, width } = infoForMazeGeneration;
    const gridMaze = generateDottedMaze(height, width);
    let freeCellsNum = 0;
    for (let i = 0; i < gridMaze.length; i++) {
      for (let j = 0; j < gridMaze[i].length; j++) {
        if (gridMaze[i][j] === MazeCell.EMPTY) {
          freeCellsNum++;
        }
      }
    }
    return {
      field: gridMaze,
      height,
      width,
      freeCellsNum,
    };
  }
}
