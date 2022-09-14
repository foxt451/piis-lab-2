import { InfoForMazeGeneration, MazeCell, MazeInfo } from "../../types/maze";

export class GameService {
  generateMaze(infoForMazeGeneration: InfoForMazeGeneration): MazeInfo {
    return {
      height: infoForMazeGeneration.height,
      width: infoForMazeGeneration.width,
      field: [...Array(infoForMazeGeneration.height).keys()].map(() => {
        return [...Array(infoForMazeGeneration.width).keys()].map(() => {
          return MazeCell.EMPTY;
        });
      }),
    };
  }
}
