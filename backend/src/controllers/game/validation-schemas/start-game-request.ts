import * as yup from "yup";
import { SchemaOf } from "yup";
import { StartGameRequestDto } from "../types/start-game-request-dto";

export const startGameRequestSchema: SchemaOf<StartGameRequestDto> = yup
  .object()
  .shape({
    mazeGenerationInfo: yup.object().shape({
      height: yup.number().integer().positive().required(),
      width: yup.number().integer().positive().required(),
    }),
  });
