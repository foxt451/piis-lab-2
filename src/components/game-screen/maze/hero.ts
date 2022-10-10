import { store } from "../../../store/store";
import { CellCoords } from "../../../types/maze";

const heroSprite = new Image();
heroSprite.src = "/assets/sprites/gopher.png";
let isHeroSpriteLoaded = false;

heroSprite.addEventListener(
  "load",
  () => {
    isHeroSpriteLoaded = true;
  },
  false
);

export const renderHero = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const heroScale = 2;

  const state = store.getState().game;
  const heroInfo = state.hero.info;
  if (!heroInfo || !isHeroSpriteLoaded) {
    return;
  }
  canvas.drawImage(
    heroSprite,
    (heroInfo.position.x - (heroScale - 1) / 2) * cellSize,
    (heroInfo.position.y - (heroScale - 1) / 2) * cellSize,
    cellSize * heroScale,
    cellSize * heroScale
  );
};

const coveredCellColor = "rgba(0, 0, 255, 0.2)";

export const renderCoveredCells = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const state = store.getState().game;
  const heroInfo = state.hero.info;
  if (!heroInfo) {
    return;
  }
  canvas.fillStyle = coveredCellColor;
  const cellsCovered = heroInfo.cellsCovered;
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
