import { EnemyInfo } from "./enemy";
import { HeroInfo } from "./hero";
import { InfoForMazeGeneration, MazeInfo } from "./maze";

export type StartGameRequestDto = {
  mazeGenerationInfo: InfoForMazeGeneration;
};

export type StartGameResponseDto = {
  maze: MazeInfo;
  hero: HeroInfo;
  enemies: EnemyInfo[];
  gameScore: number;
};
