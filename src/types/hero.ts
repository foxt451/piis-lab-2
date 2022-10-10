import { CellCoords } from "./maze";

export type HeroInfo = {
  position: CellCoords;
  speedCellsPerSec: number;
  cellsCovered: number[][];
  cellsCoveredNum: number;
};
