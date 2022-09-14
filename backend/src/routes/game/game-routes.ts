import express from "express";
import { getMaze } from "../../controllers/game/game-controller";
import { generateMazeQuerySchema } from "../../controllers/game/validation-schemas/generate-maze-query";
import { yupQueryValidationMiddleware } from "../../middleware/yup-query-validation-middleware";
import { gameRouteNames } from "./game-routes.config";

const gameRouter = express.Router();

gameRouter.get(
  gameRouteNames.maze,
  yupQueryValidationMiddleware(generateMazeQuerySchema),
  getMaze
);

export { gameRouter };
