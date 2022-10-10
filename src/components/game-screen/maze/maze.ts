import { GameStep, requestNewGame } from "../../../store/slices/game-slice";
import { store } from "../../../store/store";
import { MazeCell } from "../../../types/maze";
import { renderEnemies } from "./enemy";
import { renderHero, renderCoveredCells } from "./hero";
import { renderWall } from "./wall";

const cellColors = {
  [MazeCell.EMPTY]: "rgba(255, 255, 255)",
  [MazeCell.WALL]: "rgb(200, 0, 0)",
} as const;

export const renderMaze = async (canvas: CanvasRenderingContext2D) => {
  const state = store.getState().game;
  const mazeInfo = state.maze;
  if (!mazeInfo.info || !state.hero.info) {
    if (state.gameStep === GameStep.IDLE) {
      store.dispatch(requestNewGame());
    }
    return;
  }

  const cellSize = canvas.canvas.width / mazeInfo.info.width;
  for (let i = 0; i < mazeInfo.info.height; i++) {
    for (let j = 0; j < mazeInfo.info.width; j++) {
      const cell = mazeInfo.info.field[i][j];
      if (cell === MazeCell.WALL) {
        renderWall(canvas, cellSize, { y: i, x: j });
      } else {
        canvas.fillStyle = cellColors[cell];
        canvas.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }

  renderCoveredCells(canvas, cellSize);
  renderHero(canvas, cellSize);
  renderEnemies(canvas, cellSize);
};
