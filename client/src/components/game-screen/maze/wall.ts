import { CellCoords } from "../../../types/maze";

const wallSprite = new Image();
wallSprite.src = "/assets/sprites/wall.png";
let isWallSpriteLoaded = false;

wallSprite.addEventListener(
  "load",
  () => {
    isWallSpriteLoaded = true;
  },
  false
);

export const renderWall = (
  canvas: CanvasRenderingContext2D,
  cellSize: number,
  coords: CellCoords
) => {
  const wallScale = 1;
  
  if (!isWallSpriteLoaded) {
    return;
  }
  canvas.drawImage(
    wallSprite,
    (coords.x - (wallScale - 1) / 2) * cellSize,
    (coords.y - (wallScale - 1) / 2) * cellSize,
    cellSize * wallScale,
    cellSize * wallScale
  );
};