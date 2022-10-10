import { store } from "../../../store/store";

const enemySprite = new Image();
enemySprite.src = "/assets/sprites/ghost_red.png";
let isEnemySpriteLoaded = false;

enemySprite.addEventListener(
  "load",
  () => {
    isEnemySpriteLoaded = true;
  },
  false
);

export const renderEnemies = (
  canvas: CanvasRenderingContext2D,
  cellSize: number
) => {
  const enemyScale = 1;

  const state = store.getState().game;
  const enemiesInfo = state.enemies;
  if (!isEnemySpriteLoaded) {
    return;
  }
  for (const enemy of enemiesInfo) {
    canvas.drawImage(
      enemySprite,
      (enemy.position.x - (enemyScale - 1) / 2) * cellSize,
      (enemy.position.y - (enemyScale - 1) / 2) * cellSize,
      cellSize * enemyScale,
      cellSize * enemyScale
    );
  }
};
