import { CellCoords } from "../../../types/game/maze";

export const areCellsEqual = (a: CellCoords, b: CellCoords): boolean =>
  a.x === b.x && a.y === b.y;
