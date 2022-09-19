import { Socket } from "socket.io";
import { validationSchemas } from "./validation-schemas";

export const validationMiddleware = async (
  eventName: string,
  args: any[],
  socket: Socket,
  next: (err?: Error | undefined) => void
) => {
  try {
    const schema = validationSchemas[eventName];
    if (!schema) {
      socket.data.body = args[0];
      return next();
    }
    // only interested in first arg
    const validated = await schema.validate(args[0]);
    socket.data.body = validated;
    next();
  } catch (err) {
    next(err as Error);
  }
};
