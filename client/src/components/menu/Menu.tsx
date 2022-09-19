import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { AppStep, setAppStep } from "../../store/slices/app-slice";
import { resetGameState, setAlgo } from "../../store/slices/game-slice";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.scss";
import { PathAlgo } from "../../types/path-algo";

const Menu = () => {
  const dispatch = useAppDispatch();

  const onAlgoChange = (algo: PathAlgo) => {
    dispatch(setAlgo(algo));
  };

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
        <li>
          <label>
            A*
            <input
              type="radio"
              name="algo"
              value="a-star"
              defaultChecked
              onChange={(e) => {
                onAlgoChange(e.target.value as PathAlgo);
              }}
            />
          </label>
          <label>
            Lee
            <input
              type="radio"
              name="algo"
              value="lee"
              onChange={(e) => {
                onAlgoChange(e.target.value as PathAlgo);
              }}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
