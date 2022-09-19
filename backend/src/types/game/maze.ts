export enum MazeCell {
  EMPTY = 0,
  WALL = 1,
  FINISH = 2,
}

export type MazeField = MazeCell[][];

export type MazeInfo = {
  field: MazeField;
  height: number;
  width: number;
  exits: CellCoords[];
};

export type InfoForMazeGeneration = {
  width: number;
  height: number;
};

export type CellCoords = {
  x: number;
  y: number;
};

export type SetWallRequestDto = CellCoords;

