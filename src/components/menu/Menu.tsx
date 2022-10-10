import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { AppStep, setAppStep } from "../../store/slices/app-slice";
import { resetGameState } from "../../store/slices/game-slice";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.scss";

const Menu = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["menu-container"]}>
      <ul className={styles["menu"]}>
        <li>
          <button
            onClick={() => {
              dispatch(resetGameState());
              dispatch(setAppStep(AppStep.IN_GAME));
            }}
            className={commonStyles["mc-button"]}
          >
            <span className={commonStyles["title"]}>Start new game</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
