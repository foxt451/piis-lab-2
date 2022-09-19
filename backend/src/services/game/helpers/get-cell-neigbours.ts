import { CellCoords, MazeField } from "../../../types/game/maze";

export const getGridMazeCellEmptyNeighbours = (
  height: number,
  width: number,
  cell: CellCoords
): CellCoords[] => {
  const result: CellCoords[] = [];
  if (cell.x > 1) {
    result.push({ x: cell.x - 2, y: cell.y });
  }
  if (cell.y > 1) {
    result.push({ x: cell.x, y: cell.y - 2 });
  }
  if (cell.x < width - 2) {
    result.push({ x: cell.x + 2, y: cell.y });
  }
  if (cell.y < height - 2) {
    result.push({ x: cell.x, y: cell.y + 2 });
  }
  return result;
};

export const getCellAllNeighbours = (
  height: number,
  width: number,
  cell: CellCoords
): CellCoords[] => {
  const result: CellCoords[] = [];
  if (cell.x > 0) {
    result.push({ x: cell.x - 1, y: cell.y });
  }
  if (cell.y > 0) {
    result.push({ x: cell.x, y: cell.y - 1 });
  }
  if (cell.x < width - 1) {
    result.push({ x: cell.x + 1, y: cell.y });
  }
  if (cell.y < height - 1) {
    result.push({ x: cell.x, y: cell.y + 1 });
  }

  if (cell.x > 0 && cell.y > 0) {
    result.push({ x: cell.x - 1, y: cell.y - 1 });
  }
  if (cell.x > 0 && cell.y < height - 1) {
    result.push({ x: cell.x - 1, y: cell.y + 1 });
  }
  if (cell.y > 0 && cell.x < width - 1) {
    result.push({ x: cell.x + 1, y: cell.y - 1 });
  }
  if (cell.y < height - 1 && cell.x < width - 1) {
    result.push({ x: cell.x + 1, y: cell.y + 1 });
  }
  return result;
};

export const getCellAllManhattanNeighbours = (
  height: number,
  width: number,
  cell: CellCoords
): CellCoords[] => {
  const result: CellCoords[] = [];
  if (cell.x > 0) {
    result.push({ x: cell.x - 1, y: cell.y });
  }
  if (cell.y > 0) {
    result.push({ x: cell.x, y: cell.y - 1 });
  }
  if (cell.x < width - 1) {
    result.push({ x: cell.x + 1, y: cell.y });
  }
  if (cell.y < height - 1) {
    result.push({ x: cell.x, y: cell.y + 1 });
  }
  return result;
};
