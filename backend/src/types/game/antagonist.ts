import { CellCoords } from "./maze";
import { Path } from "./path";

export type AntagonistInfo = {
  position: CellCoords;
  constructedPath: Path | null;
  cellsPerSecond: number;
  cellsCovered: boolean[][];
};
