import { CellCoords, MazeInfo } from "../../../types/game/maze";

export const isValidCell = (cell: CellCoords, maze: MazeInfo) => {
  return (
    cell.x >= 0 && cell.y >= 0 && cell.x < maze.width && cell.y < maze.height
  );
};
