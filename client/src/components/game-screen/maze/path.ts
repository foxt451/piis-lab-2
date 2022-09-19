import { Path } from "../../../types/path";

const pathSprite = new Image();
pathSprite.src = "/assets/sprites/paws.png";
let isPathSpriteLoaded = false;

pathSprite.addEventListener(
  "load",
  () => {
    isPathSpriteLoaded = true;
  },
  false
);

export const renderPath = async (
  canvas: CanvasRenderingContext2D,
  path: Path,
  cellSize: number
) => {
  const pathScale = 0.75;

  if (!isPathSpriteLoaded) {
    return;
  }

  path.forEach((pathCell) => {
    canvas.drawImage(
      pathSprite,
      (pathCell.x - (pathScale - 1) / 2) * cellSize,
      (pathCell.y - (pathScale - 1) / 2) * cellSize,
      cellSize * pathScale,
      cellSize * pathScale
    );
  });
};
