import { store } from "../../../store/store";

const antagonistColor = "rgba(0, 0, 255)";

export const renderAntagonist = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const state = store.getState().game;
  const antagonistInfo = state.antagonist.info;
  if (!antagonistInfo) {
    return;
  }

  canvas.fillStyle = antagonistColor;
  canvas.fillRect(
    antagonistInfo.position.x * cellSize,
    antagonistInfo.position.y * cellSize,
    cellSize,
    cellSize
  );
};
