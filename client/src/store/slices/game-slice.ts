import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { socket } from "../../socket-io";
import { eventNames } from "../../socket-io/events";
import { AntagonistInfo } from "../../types/antagonist";
import { StartGameRequestDto, StartGameResponseDto } from "../../types/game";
import { MazeInfo, SetWallRequestDto } from "../../types/maze";
import { PathAlgo } from "../../types/path-algo";
import { ThunkConfig } from "../store";

export enum GameStep {
  IDLE,
  INIT_LOADING,
  PRE_START,
  IN_PROGRESS,
  ANTAGONIST_WINS,
}

type GameState = {
  maze: {
    info: MazeInfo | null;
  };
  antagonist: {
    info: AntagonistInfo | null;
  };
  gameScore: number;
  algorithm: PathAlgo;
  gameStep: GameStep;
};

const initialState: GameState = {
  maze: {
    info: null,
  },
  antagonist: {
    info: null,
  },
  algorithm: "a-star",
  gameScore: 0,
  gameStep: GameStep.IDLE,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setAntagonistInfo(state, action: PayloadAction<AntagonistInfo>) {
      state.antagonist.info = action.payload;
    },
    finishGame(state) {
      state.gameStep = GameStep.ANTAGONIST_WINS;
    },
    setScore(state, action: PayloadAction<number>) {
      state.gameScore = action.payload;
    },
    setAlgo(state, action: PayloadAction<PathAlgo>) {
      state.algorithm = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(requestNewGame.pending, (state, { payload }) => {
      state.gameStep = GameStep.INIT_LOADING;
    });
    builder.addCase(requestNewGame.fulfilled, (state, { payload }) => {
      state.maze.info = payload.maze;
      state.antagonist.info = payload.antagonist;
      state.gameStep = GameStep.PRE_START;
    });

    builder.addCase(resumeGame.fulfilled, (state) => {
      state.gameStep = GameStep.IN_PROGRESS;
    });

    builder.addCase(setWall.fulfilled, (state, { payload }) => {
      state.maze.info = payload;
    });
  },
});

const MAZE_SIZE = 31;
export const requestNewGame = createAsyncThunk<
  StartGameResponseDto,
  void,
  ThunkConfig
>("game/requestNewGame", async (_, { getState }) => {
  const requestBody: StartGameRequestDto = {
    mazeGenerationInfo: {
      height: MAZE_SIZE,
      width: MAZE_SIZE,
    },
    algorithm: getState().game.algorithm,
  };

  const mazeInfo: StartGameResponseDto = await new Promise((resolve) =>
    socket.emit(eventNames.createGame, requestBody, resolve)
  );
  return mazeInfo;
});

export const resumeGame = createAsyncThunk<void>("game/resumeGame", () => {
  return new Promise((resolve) =>
    socket.emit(eventNames.resumeGame, undefined, resolve)
  );
});

export const setWall = createAsyncThunk<MazeInfo, SetWallRequestDto>(
  "game/setWall",
  (requestDto) => {
    return new Promise((resolve) =>
      socket.emit(eventNames.setWall, requestDto, resolve)
    );
  }
);

export const {
  reset: resetGameState,
  setAntagonistInfo,
  finishGame,
  setScore,
  setAlgo,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
