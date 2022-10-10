import { MazeCell, MazeField } from "../../types/maze";

export const generateDottedMaze = (height: number, width: number): MazeField => {
  return Array.from(Array(height).keys(), (indexY) => {
    return Array.from(Array(width).keys(), (indexX) => {
      return (indexY % 2 === 0 && indexX % 2 === 0) ||
        (indexX % 6 === 0 && indexY % 3 === 0) ||
        (indexX % 9 === 0 && indexY % 7 === 0) ||
        (indexX % 11 === 0 && indexY % 6 === 0) ||
        (indexX % 5 === 0 && indexY % 9 === 0)
        ? MazeCell.WALL
        : MazeCell.EMPTY;
    });
  });
};
