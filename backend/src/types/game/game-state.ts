import { AntagonistInfo } from "./antagonist";
import { MazeInfo } from "./maze";
import { PathAlgo } from "./path-algo";

export enum GameStep {
  PAUSED,
  IN_PROGRESS,
}

export type GameState = {
  maze: MazeInfo;
  antagonist: AntagonistInfo;
  gameStep: GameStep;
  gameScore: number;
  algortihm: PathAlgo;
};
