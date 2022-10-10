import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeroInfo } from "../../types/hero";
import { StartGameRequestDto, StartGameResponseDto } from "../../types/game";
import { ThunkConfig } from "../store";
import { CellCoords, MazeInfo } from "../../types/maze";
import { enemyService, gameService, heroService } from "../../services";
import { EnemyInfo } from "../../types/enemy";

export enum GameStep {
  IDLE,
  INIT_LOADING,
  PRE_START,
  IN_PROGRESS,
  HERO_WINS,
}

type GameState = {
  maze: {
    info: MazeInfo | null;
  };
  hero: {
    info: HeroInfo | null;
  };
  enemies: EnemyInfo[];
  gameScore: number;
  gameStep: GameStep;
};

const initialState: GameState = {
  maze: {
    info: null,
  },
  hero: {
    info: null,
  },
  enemies: [],
  gameScore: 0,
  gameStep: GameStep.IDLE,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset() {
      return { ...initialState };
    },
    setHeroInfo(state, action: PayloadAction<HeroInfo>) {
      state.hero.info = action.payload;
    },
    finishGameHeroWins(state) {
      state.gameStep = GameStep.HERO_WINS;
    },
    moveHero(state) {
      if (!state.maze.info || !state.hero.info) {
        return;
      }
      const nextPos = heroService.getNextPos(
        state.maze.info,
        state.hero.info,
        state.enemies
      );
      if (!nextPos) {
        return;
      }
      const { x, y } = nextPos;
      const shouldIncreaseScore = !state.hero.info.cellsCovered[y][x];
      state.hero.info.cellsCovered[y][x]++;
      state.hero.info.position = nextPos;
      if (shouldIncreaseScore) {
        state.gameScore++;
        state.hero.info.cellsCoveredNum++;
      }
    },
    moveEnemy(state, action: PayloadAction<string>) {
      const enemy = state.enemies.find((enemy) => enemy.id === action.payload);
      if (!enemy || !state.maze.info || !state.hero.info) {
        return;
      }
      const nextStep = enemyService.getNextStepAStar(
        state.maze.info,
        enemy,
        state.hero.info.position
      );
      if (nextStep) {
        enemy.position = nextStep;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(requestNewGame.pending, (state) => {
      state.gameStep = GameStep.INIT_LOADING;
    });
    builder.addCase(requestNewGame.fulfilled, (state, { payload }) => {
      state.maze.info = payload.maze;
      state.hero.info = payload.hero;
      state.enemies = payload.enemies;
      state.gameStep = GameStep.PRE_START;
    });

    builder.addCase(resumeGame.fulfilled, (state) => {
      state.gameStep = GameStep.IN_PROGRESS;
    });
  },
});

const MAZE_SIZE = 15;
export const requestNewGame = createAsyncThunk<
  StartGameResponseDto,
  void,
  ThunkConfig
>("game/requestNewGame", async (_, { getState }) => {
  const generationInfo: StartGameRequestDto = {
    mazeGenerationInfo: {
      height: MAZE_SIZE,
      width: MAZE_SIZE,
    },
  };
  const mazeInfo: StartGameResponseDto =
    gameService.generateGame(generationInfo);
  return mazeInfo;
});

export const resumeGame = createAsyncThunk<void>("game/resumeGame", () => {
  return Promise.resolve();
});

export const {
  reset: resetGameState,
  setHeroInfo: setAntagonistInfo,
  finishGameHeroWins: finishGame,
  moveEnemy,
  moveHero,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
