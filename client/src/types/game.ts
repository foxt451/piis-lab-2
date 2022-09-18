import { AntagonistInfo } from "./antagonist";
import { InfoForMazeGeneration, MazeInfo } from "./maze";

export type StartGameRequestDto = {
  mazeGenerationInfo: InfoForMazeGeneration;
};

export type StartGameResponseDto = {
  maze: MazeInfo;
  antagonist: AntagonistInfo;
};
