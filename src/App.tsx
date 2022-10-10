import React, { ReactNode } from "react";
import GameScreen from "./components/game-screen/GameScreen";
import Menu from "./components/menu/Menu";
import { useAppSelector } from "./hooks/redux";
import { AppStep } from "./store/slices/app-slice";

function App() {
  const appStep = useAppSelector((state) => state.app.appStep);
  let screenComponent: ReactNode = null;
  switch (appStep) {
    case AppStep.MENU:
      screenComponent = <Menu />;
      break;
    case AppStep.IN_GAME:
      screenComponent = <GameScreen />;
      break;
  }
  return screenComponent;
}

export default App;
