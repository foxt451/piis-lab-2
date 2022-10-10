import { CellCoords } from "../../types/maze";

export const areCellsEqual = (a: CellCoords, b: CellCoords): boolean =>
  a.x === b.x && a.y === b.y;
