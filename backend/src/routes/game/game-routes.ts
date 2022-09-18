import express from "express";
import { getMaze, startGame } from "../../controllers/game/game-controller";
import { generateMazeQuerySchema } from "../../controllers/game/validation-schemas/generate-maze-query";
import { startGameRequestSchema } from "../../controllers/game/validation-schemas/start-game-request";
import { yupBodyValidationMiddleware } from "../../middleware/yup-body-validation-middleware";
import { yupQueryValidationMiddleware } from "../../middleware/yup-query-validation-middleware";
import { gameRouteNames } from "./game-routes.config";

const gameRouter = express.Router();

gameRouter.get(
  gameRouteNames.maze,
  yupQueryValidationMiddleware(generateMazeQuerySchema),
  getMaze
);

gameRouter.post(
  gameRouteNames.start,
  yupBodyValidationMiddleware(startGameRequestSchema),
  startGame
);

export { gameRouter };
