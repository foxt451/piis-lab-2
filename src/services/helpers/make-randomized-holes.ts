import { MazeCell, MazeField } from "../../types/maze";

export const makeRandomizedHoles = (field: MazeField, randomFactor = 0.2) => {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === MazeCell.WALL && Math.random() < randomFactor) {
        field[i][j] = MazeCell.EMPTY;
      }
    }
  }
};
