import { CellCoords } from "../../../types/maze";
import { Direction } from "./direction";

export type AntagonistInfo = {
  position: CellCoords;
  direction: Direction;
};
