import { NextFunction, Request } from "express";
import { AnySchema } from "yup";

export const yupBodyValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: unknown, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body);
      req.body = validated;
      next();
    } catch (err) {
      next(err);
    }
  };
