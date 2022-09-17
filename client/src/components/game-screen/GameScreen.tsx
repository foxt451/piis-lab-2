import React, { FC, useEffect, useState } from "react";
import { renderMaze } from "./maze/maze";
import styles from "./styles.module.css";

const GameScreen: FC = () => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const draw = () => {
      if (!canvasContext) {
        return;
      }

      canvasContext.clearRect(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height
      );
      renderMaze(canvasContext);
    };
    const interval = setInterval(draw, 1000 / 30);
    return () => {
      clearInterval(interval);
    };
  }, [canvasContext]);

  return (
    <div className={styles["game-container"]}>
      <canvas
        className={styles["canvas"]}
        width={800}
        height={800}
        ref={(value) => {
          value &&
            setCanvasContext(
              (currentContext) => currentContext || value.getContext("2d")
            );
        }}
      ></canvas>
    </div>
  );
};

export default GameScreen;
