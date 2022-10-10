import { MazeCell, MazeField } from "../../types/maze";

export const generateGridMaze = (height: number, width: number): MazeField => {
  return Array.from(Array(height).keys(), (indexY) => {
    return Array.from(Array(width).keys(), (indexX) => {
      return indexY % 2 === 0 || indexX % 2 === 0
        ? MazeCell.WALL
        : MazeCell.EMPTY;
    });
  });
};
