import { AntagonistInfo } from "./antagonist";
import { InfoForMazeGeneration, MazeInfo } from "./maze";
import { PathAlgo } from "./path-algo";

export type StartGameRequestDto = {
  mazeGenerationInfo: InfoForMazeGeneration;
  algorithm: PathAlgo;
};

export type StartGameResponseDto = {
  maze: MazeInfo;
  antagonist: AntagonistInfo;
  gameScore: number;
};
