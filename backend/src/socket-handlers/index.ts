import { Server } from "socket.io";
import { ExtendedGameSocket, initGameHandlers } from "./game/handlers";
import { validationMiddleware } from "./middleware/validation-middleware";

export const initSocketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("connected");

    initGameHandlers(socket as ExtendedGameSocket);

    socket.use(([event, ...args], next) => {
      validationMiddleware(event, args, socket, next);
    });

    socket.on("error", (err) => {
      console.log(err.message);
      socket.disconnect();
    });
  });
};
