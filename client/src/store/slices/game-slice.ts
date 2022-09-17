import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config";
import { MazeInfo } from "../../types/maze";

export enum GameStep {
  INIT_LOADING,
  IDLE,
  IN_PROGRESS,
}

type GameState = {
  maze: {
    info: MazeInfo | null;
  };
  gameStep: GameStep;
};

const initialState: GameState = {
  maze: {
    info: null,
  },
  gameStep: GameStep.IDLE,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(requestNewGame.pending, (state, { payload }) => {
      state.gameStep = GameStep.INIT_LOADING;
    });
    builder.addCase(requestNewGame.fulfilled, (state, { payload }) => {
      state.maze.info = payload;
      state.gameStep = GameStep.IN_PROGRESS;
    });
  },
});

export const requestNewGame = createAsyncThunk<MazeInfo>(
  "game/requestNewGame",
  async () => {
    const response = await fetch(
      `${config.API_URL}/game/maze?height=51&width=51`
    );
    const mazeInfo = (await response.json()) as MazeInfo;
    return mazeInfo;
  }
);

export const gameReducer = gameSlice.reducer;
