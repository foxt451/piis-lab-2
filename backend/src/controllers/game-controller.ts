import { Request, Response } from "express";
import { mazeService } from "../services";
import { GenerateMazeQuery } from "../types/game/generate-maze-query";
import { MazeInfo } from "../types/game/maze";

const getMaze = (req: Request, res: Response<MazeInfo>) => {
  return res.send(
    mazeService.generateMaze(req.query as unknown as GenerateMazeQuery)
  );
};

export { getMaze };
