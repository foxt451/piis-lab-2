import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config";
import { AntagonistInfo } from "../../types/antagonist";
import { StartGameRequestDto, StartGameResponseDto } from "../../types/game";
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
  antagonist: {
    info: AntagonistInfo | null;
  };
  gameStep: GameStep;
};

const initialState: GameState = {
  maze: {
    info: null,
  },
  antagonist: {
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
      state.maze.info = payload.maze;
      state.antagonist.info = payload.antagonist;
      state.gameStep = GameStep.IN_PROGRESS;
    });
  },
});

export const requestNewGame = createAsyncThunk<StartGameResponseDto>(
  "game/requestNewGame",
  async () => {
    const requestBody: StartGameRequestDto = {
      mazeGenerationInfo: {
        height: 51,
        width: 51,
      },
    };
    const response = await fetch(`${config.API_URL}/game/start`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const mazeInfo = (await response.json()) as StartGameResponseDto;
    return mazeInfo;
  }
);

export const gameReducer = gameSlice.reducer;
