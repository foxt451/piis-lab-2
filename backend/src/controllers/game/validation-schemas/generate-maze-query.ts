import * as yup from "yup";
import { SchemaOf } from "yup";
import { GenerateMazeQuery } from "../types/generate-maze-query";

export const generateMazeQuerySchema: SchemaOf<GenerateMazeQuery> = yup
  .object()
  .shape({
    height: yup.number().integer().positive().required(),
    width: yup.number().integer().positive().required(),
  });
