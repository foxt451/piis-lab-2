import * as yup from "yup";
import { SchemaOf } from "yup";
import { SetWallRequestDto } from "../types/game/maze";

export const setWallRequestSchema: SchemaOf<SetWallRequestDto> = yup
  .object()
  .shape({
    x: yup.number().integer().min(0).required(),
    y: yup.number().integer().min(0).required(),
  });
