import { CellCoords } from "../../../types/maze";

const exitSprite = new Image();
exitSprite.src = "/assets/sprites/dollar.png";
let isExitSpriteLoaded = false;

exitSprite.addEventListener(
  "load",
  () => {
    isExitSpriteLoaded = true;
  },
  false
);

export const renderExits = async (
  canvas: CanvasRenderingContext2D,
  exits: CellCoords[],
  cellSize: number
) => {
  const exitScale = 2;

  if (!isExitSpriteLoaded) {
    return;
  }
  exits.forEach((exit) => {
    canvas.drawImage(
      exitSprite,
      (exit.x - (exitScale - 1) / 2) * cellSize,
      (exit.y - (exitScale - 1) / 2) * cellSize,
      cellSize * exitScale,
      cellSize * exitScale
    );
  });
};
