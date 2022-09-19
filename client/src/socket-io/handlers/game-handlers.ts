import { Socket } from "socket.io-client";
import {
  finishGame,
  setAntagonistInfo,
  setScore,
} from "../../store/slices/game-slice";
import { AppStore } from "../../store/store";
import { AntagonistInfo } from "../../types/antagonist";
import { eventNames } from "../events";

export const initGameHandlers = (socket: Socket, store: AppStore) => {
  socket.on(eventNames.updateAntagonistInfo, (newInfo: AntagonistInfo) => {
    store.dispatch(setAntagonistInfo(newInfo));
  });

  socket.on(eventNames.antagonistWins, () => {
    store.dispatch(finishGame());
  });

  socket.on(eventNames.updatedScore, (newScore: number) => {
    store.dispatch(setScore(newScore));
  });
};
