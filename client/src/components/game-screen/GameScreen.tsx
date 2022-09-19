import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  GameStep,
  requestNewGame,
  resetGameState,
  resumeGame,
  setWall,
} from "../../store/slices/game-slice";
import { store } from "../../store/store";
import { CellCoords, MazeCell } from "../../types/maze";
import { renderMaze } from "./maze/maze";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.scss";
import { AppStep, setAppStep } from "../../store/slices/app-slice";

const GameScreen: FC = () => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const draw = () => {
      if (!canvasContext) {
        return;
      }
      renderMaze(canvasContext);
    };
    const interval = setInterval(draw, 1000 / 30);
    return () => {
      clearInterval(interval);
    };
  }, [canvasContext]);

  const gameStep = useAppSelector((state) => state.game.gameStep);
  const gameScore = useAppSelector((state) => state.game.gameScore);
  const dispatch = useAppDispatch();

  return (
    <div className={styles["game-container"]}>
      <span className={styles["game-score"]}>score: {gameScore}</span>
      {gameStep === GameStep.IN_PROGRESS || (
        <div className={styles["in-game-menu-container"]}>
          <div className={styles["in-game-menu"]}>
            {gameStep === GameStep.PRE_START && (
              <button
                onClick={() => {
                  dispatch(resumeGame());
                }}
                className={commonStyles["mc-button"]}
              >
                <span className={commonStyles["title"]}>Start Game</span>
              </button>
            )}
            {gameStep === GameStep.ANTAGONIST_WINS && (
              <button
                onClick={async () => {
                  dispatch(resetGameState());
                  dispatch(requestNewGame());
                }}
                className={commonStyles["mc-button"]}
              >
                <span className={commonStyles["title"]}>Play Again</span>
              </button>
            )}
            <button
              onClick={async () => {
                dispatch(setAppStep(AppStep.MENU));
              }}
              className={commonStyles["mc-button"]}
            >
              <span className={commonStyles["title"]}>Exit</span>
            </button>
          </div>
        </div>
      )}
      <canvas
        className={styles["canvas"]}
        width={800}
        height={800}
        onClick={(e) => {
          const canvas = e.currentTarget;
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          onFieldClick(x, y, canvas.width);
        }}
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

const onFieldClick = (x: number, y: number, canvasSize: number) => {
  const mazeInfo = store.getState().game.maze.info;
  if (!mazeInfo) {
    return;
  }
  const cellSize = canvasSize / mazeInfo.width;
  const cellClicked: CellCoords = {
    x: Math.floor(x / cellSize),
    y: Math.floor(y / cellSize),
  };
  if (mazeInfo.field[cellClicked.y][cellClicked.x] === MazeCell.EMPTY) {
    store.dispatch(setWall(cellClicked));
  }
};

export default GameScreen;
