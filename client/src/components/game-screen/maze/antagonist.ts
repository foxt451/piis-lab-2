import { store } from "../../../store/store";
import { CellCoords } from "../../../types/maze";

const antagonistSprite = new Image();
antagonistSprite.src = "/assets/sprites/gopher.png";
let isAntagonistSpriteLoaded = false;

antagonistSprite.addEventListener(
  "load",
  () => {
    isAntagonistSpriteLoaded = true;
  },
  false
);

export const renderAntagonist = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const antagonistScale = 2;

  const state = store.getState().game;
  const antagonistInfo = state.antagonist.info;
  if (!antagonistInfo || !isAntagonistSpriteLoaded) {
    return;
  }
  canvas.drawImage(
    antagonistSprite,
    (antagonistInfo.position.x - (antagonistScale - 1) / 2) * cellSize,
    (antagonistInfo.position.y - (antagonistScale - 1) / 2) * cellSize,
    cellSize * antagonistScale,
    cellSize * antagonistScale
  );
};

const coveredCellColor = "rgba(0, 0, 255, 0.2)";

export const renderCoveredCells = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const state = store.getState().game;
  const antagonistInfo = state.antagonist.info;
  if (!antagonistInfo) {
    return;
  }
  canvas.fillStyle = coveredCellColor;
  const cellsCovered = antagonistInfo.cellsCovered;
  for (let i = 0; i < cellsCovered.length; i++) {
    for (let j = 0; j < cellsCovered[i].length; j++) {
      if (cellsCovered[i][j]) {
        const cell: CellCoords = {
          y: i,
          x: j,
        };
        canvas.fillRect(
          cell.x * cellSize,
          cell.y * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
};
