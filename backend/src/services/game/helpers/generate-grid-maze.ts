import { MazeCell, MazeField } from "../../../types/maze";

export const generateGridMaze = (height: number, width: number): MazeField => {
  return [...Array(height).keys()].map((indexY) => {
    return [...Array(width).keys()].map((indexX) => {
      return indexY % 2 === 0 || indexX % 2 === 0
        ? MazeCell.WALL
        : MazeCell.EMPTY;
    });
  });
};
