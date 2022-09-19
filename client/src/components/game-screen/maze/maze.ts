import { GameStep, requestNewGame } from "../../../store/slices/game-slice";
import { store } from "../../../store/store";
import { MazeCell } from "../../../types/maze";
import { renderAntagonist, renderCoveredCells } from "./antagonist";
import { renderExits } from "./exits";
import { renderPath } from "./path";
import { renderWall } from "./wall";

const cellColors = {
  [MazeCell.EMPTY]: "rgba(255, 255, 255)",
  [MazeCell.FINISH]: "rgb(0,255,0)",
  [MazeCell.WALL]: "rgb(200, 0, 0)",
} as const;

export const renderMaze = async (canvas: CanvasRenderingContext2D) => {
  const state = store.getState().game;
  const mazeInfo = state.maze;
  if (!mazeInfo.info || !state.antagonist.info) {
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

  renderExits(canvas, mazeInfo.info.exits, cellSize);
  renderCoveredCells(canvas, cellSize);
  if (state.antagonist.info.constructedPath) {
    renderPath(canvas, state.antagonist.info.constructedPath, cellSize);
  }
  renderAntagonist(canvas, cellSize);
};
