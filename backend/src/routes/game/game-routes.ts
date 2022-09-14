import express from "express";
import { getMaze } from "../../controllers/game/game-controller";
import { gameRouteNames } from "./game-routes.config";

const gameRouter = express.Router();

gameRouter.get(gameRouteNames.maze, getMaze);

export { gameRouter };
