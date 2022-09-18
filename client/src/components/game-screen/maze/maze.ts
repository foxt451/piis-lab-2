import { GameStep, requestNewGame } from "../../../store/slices/game-slice";
import { store } from "../../../store/store";
import { MazeCell } from "../../../types/maze";
import { renderAntagonist } from "./antagonist";
import { renderExits } from "./exits";

const cellColors = {
  [MazeCell.EMPTY]: "rgba(0, 0, 0, 0)",
  [MazeCell.FINISH]: "rgb(0, 0, 0)",
  [MazeCell.WALL]: "rgb(200, 0, 0)",
} as const;

export const renderMaze = async (canvas: CanvasRenderingContext2D) => {
  const state = store.getState().game;
  const mazeInfo = state.maze;
  if (!mazeInfo.info) {
    if (state.gameStep === GameStep.IDLE) {
      store.dispatch(requestNewGame());
    }
    return;
  }

  const cellSize = canvas.canvas.width / mazeInfo.info.width;
  for (let i = 0; i < mazeInfo.info.height; i++) {
    for (let j = 0; j < mazeInfo.info.width; j++) {
      canvas.fillStyle = cellColors[mazeInfo.info.field[i][j]];
      canvas.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }

  renderExits(canvas, mazeInfo.info.exits, cellSize);
  renderAntagonist(canvas, cellSize);
};
