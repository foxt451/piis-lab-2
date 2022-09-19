import { Socket } from "socket.io";
import {
  StartGameRequestDto,
  StartGameResponseDto,
} from "../../types/game/start-game-request-dto";
import { antagonistService, mazeService } from "../../services";
import { eventNames } from "./events";
import { GameState, GameStep } from "../../types/game/game-state";
import { AntagonistService } from "../../services/game/antagonist-service";
import { clearInterval } from "timers";
import { SetWallRequestDto } from "../../types/game/maze";

export interface ExtendedGameSocket extends Socket {
  data: {
    gameState?: GameState;
    interval?: NodeJS.Timer;
    [key: string]: any;
  };
}

export const initGameHandlers = (socket: ExtendedGameSocket) => {
  socket.on(eventNames.createGame, (_data, callback) => {
    console.log("game created");

    const request: StartGameRequestDto = socket.data.body;
    const maze = mazeService.generateMaze(request.mazeGenerationInfo);
    const initialAntagonistInfo =
      antagonistService.findInitialAntagonistInfo(maze);
    const response: StartGameResponseDto = {
      maze,
      antagonist: initialAntagonistInfo,
      gameScore: 1,
    };
    const gameState: GameState = {
      ...response,
      gameStep: GameStep.PAUSED,
      algortihm: request.algorithm,
    };
    // for later retrieval
    socket.data.gameState = gameState;
    callback(response);
  });

  socket.on(eventNames.resumeGame, (_data, callback) => {
    console.log("game resumed");

    const gameState = socket.data.gameState as GameState;
    gameState.gameStep = GameStep.IN_PROGRESS;
    const interval = setInterval(() => {
      antagonistLoop(socket, gameState);
    }, (1 / AntagonistService.CELLS_PER_SECOND) * 1000);
    socket.data.interval = interval;
    callback();
  });

  socket.on(eventNames.setWall, (_data, callback) => {
    const gameState = socket.data.gameState as GameState;
    const request: SetWallRequestDto = socket.data.body;
    const newMaze = mazeService.setWall(request, gameState.maze);
    gameState.maze = newMaze;
    reconstructPath(gameState);
    socket.emit(eventNames.updateAntagonistInfo, gameState.antagonist);
    callback(newMaze);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");

    clearFromGameHandlerEffects(socket);
  });
};

const antagonistLoop = (socket: Socket, gameState: GameState) => {
  const constructedPath = gameState.antagonist.constructedPath;
  const nextPoint = constructedPath?.[1] ?? gameState.antagonist.position;
  gameState.antagonist.position = nextPoint;
  if (gameState.antagonist.constructedPath) {
    gameState.antagonist.constructedPath =
      gameState.antagonist.constructedPath.slice(1);
  }
  if (!gameState.antagonist.cellsCovered[nextPoint.y][nextPoint.x]) {
    gameState.gameScore++;
    socket.emit(eventNames.updatedScore, gameState.gameScore);
  }
  gameState.antagonist.cellsCovered[nextPoint.y][nextPoint.x] = true;
  socket.emit(eventNames.updateAntagonistInfo, gameState.antagonist);
  if (
    gameState.maze.exits.some(
      (exit) => exit.y === nextPoint.y && exit.x === nextPoint.x
    )
  ) {
    socket.emit(eventNames.antagonistWins);
    return finishGame(socket, gameState);
  }
  if (gameState.antagonist.constructedPath === null) {
    socket.emit(eventNames.antagonistWins);
    return finishGame(socket, gameState);
  }
};

const finishGame = (socket: ExtendedGameSocket, gameState: GameState) => {
  console.log("game over");

  gameState.gameStep = GameStep.PAUSED;
  clearFromGameHandlerEffects(socket);
};

const reconstructPath = (gameState: GameState) => {
  const newBestPath = antagonistService.constructPath(
    "a-star",
    gameState.maze,
    gameState.antagonist.position,
    gameState.maze.exits
  );
  gameState.antagonist.constructedPath = newBestPath;
};

const clearFromGameHandlerEffects = (socket: ExtendedGameSocket) => {
  clearInterval(socket.data.interval);
};
