import { Request, Response } from "express";
import { gameService } from "../../services";
import { MazeInfo } from "../../types/maze";
import { GenerateMazeQuery } from "./types/generate-maze-query";

const getMaze = (req: Request, res: Response<MazeInfo>) => {
  return res.send(gameService.generateMaze(req.query as unknown as GenerateMazeQuery));
};

export { getMaze };
