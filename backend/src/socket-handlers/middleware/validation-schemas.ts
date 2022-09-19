import { AnySchema } from "yup";
import { setWallRequestSchema } from "../../validation-schemas/set-wall-request";
import { startGameRequestSchema } from "../../validation-schemas/start-game-request";
import { eventNames } from "../game/events";

export const validationSchemas: Record<string, AnySchema> = {
  [eventNames.createGame]: startGameRequestSchema,
  [eventNames.setWall]: setWallRequestSchema,
};
