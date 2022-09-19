import * as yup from "yup";
import { SchemaOf } from "yup";
import { PathAlgo } from "../types/game/path-algo";
import { StartGameRequestDto } from "../types/game/start-game-request-dto";

export const startGameRequestSchema: SchemaOf<StartGameRequestDto> = yup
  .object()
  .shape({
    mazeGenerationInfo: yup.object().shape({
      height: yup.number().integer().positive().required(),
      width: yup.number().integer().positive().required(),
    }),
    algorithm: yup.mixed<PathAlgo>().oneOf(["a-star", "lee"]).default("a-star"),
  });
