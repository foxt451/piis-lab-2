import { CellCoords } from "./maze";

export type EnemyInfo = {
  id: string;
  position: CellCoords;
  speedCellsPerSec: number;
};
