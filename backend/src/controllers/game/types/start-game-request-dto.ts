import { InfoForMazeGeneration, MazeInfo } from "../../../types/maze";
import { AntagonistInfo } from "./antagonist";

export type StartGameRequestDto = {
  mazeGenerationInfo: InfoForMazeGeneration;
};

export type StartGameResponseDto = {
  maze: MazeInfo;
  antagonist: AntagonistInfo;
};
