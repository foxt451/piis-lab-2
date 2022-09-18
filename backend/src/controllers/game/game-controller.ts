import { Request, Response } from "express";
import { antagonistService, mazeService } from "../../services";
import { MazeInfo } from "../../types/maze";
import { GenerateMazeQuery } from "./types/generate-maze-query";
import {
  StartGameRequestDto,
  StartGameResponseDto,
} from "./types/start-game-request-dto";

const getMaze = (req: Request, res: Response<MazeInfo>) => {
  return res.send(
    mazeService.generateMaze(req.query as unknown as GenerateMazeQuery)
  );
};

const startGame = (req: Request, res: Response<StartGameResponseDto>) => {
  const body = req.body as unknown as StartGameRequestDto;
  const maze = mazeService.generateMaze(body.mazeGenerationInfo);
  return res.send({
    maze,
    antagonist: antagonistService.findInitialAntagonistPos(maze),
  });
};

export { getMaze, startGame };
