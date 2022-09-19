import { Socket } from "socket.io-client";
import { AppStore } from "../../store/store";
import { initGameHandlers } from "./game-handlers";

export const initHandlers = (socket: Socket, store: AppStore) => {
  initGameHandlers(socket, store);
};
