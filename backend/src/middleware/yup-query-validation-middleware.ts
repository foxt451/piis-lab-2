import { NextFunction, Request } from "express";
import { AnySchema } from "yup";

export const yupQueryValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: unknown, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.query);
      req.query = validated;
      next();
    } catch (err) {
      next(err);
    }
  };
