import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  finishGame,
  GameStep,
  moveEnemy,
  moveHero,
  requestNewGame,
  resetGameState,
  resumeGame,
} from "../../store/slices/game-slice";
import { renderMaze } from "./maze/maze";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.scss";
import { AppStep, setAppStep } from "../../store/slices/app-slice";
import { areCellsEqual } from "../../services/helpers/are-cells-equal";

const MOVE_TIMING_MS = 1000 / 5;
const EN_MOVE_TIMING_MS = 1000 / 2;

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
  const enemies = useAppSelector((state) => state.game.enemies);
  const hero = useAppSelector((state) => state.game.hero);
  const gameScore = useAppSelector((state) => state.game.gameScore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hero.info) {
      return;
    }
    let timer: NodeJS.Timer | undefined;
    if (gameStep === GameStep.IN_PROGRESS) {
      timer = setInterval(() => {
        dispatch(moveHero());
      }, MOVE_TIMING_MS);
    }

    return () => {
      clearInterval(timer);
      timer = undefined;
    };
  }, [dispatch, hero, gameStep, enemies]);

  useEffect(() => {
    let timer: NodeJS.Timer | undefined;
    if (gameStep === GameStep.IN_PROGRESS) {
      timer = setInterval(() => {
        for (const enemy of enemies) {
          dispatch(moveEnemy(enemy.id));
        }
      }, EN_MOVE_TIMING_MS);
    }

    return () => {
      clearInterval(timer);
      timer = undefined;
    };
  }, [dispatch, gameStep, enemies]);

  useEffect(() => {
    if (gameStep === GameStep.IN_PROGRESS && hero.info) {
      if (
        enemies.some((enemy) =>
          areCellsEqual(enemy.position, hero.info!.position)
        )
      ) {
        dispatch(finishGame());
      }
    }
  });

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
            {gameStep === GameStep.HERO_WINS && (
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
