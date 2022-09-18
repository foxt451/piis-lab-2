import { CellCoords } from "../../../types/maze";

const exitColor = "rgba(0, 150, 0, 0.8)";

export const renderExits = async (
  canvas: CanvasRenderingContext2D,
  exits: CellCoords[],
  cellSize: number
) => {
  canvas.fillStyle = exitColor;
  exits.forEach((exit) => {
    canvas.beginPath();
    canvas.arc(
      exit.x * cellSize + cellSize / 2,
      exit.y * cellSize + cellSize / 2,
      cellSize,
      0,
      Math.PI * 2,
      true
    );
    canvas.fill();
  });
};
