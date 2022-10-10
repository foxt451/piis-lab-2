import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AppStep {
  MENU,
  IN_GAME,
}

type AppState = {
  appStep: AppStep;
};

const initialState: AppState = {
  appStep: AppStep.MENU,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<AppStep>) {
      state.appStep = action.payload;
    },
  },
});

export const { setStep: setAppStep } = appSlice.actions;

export const appReducer = appSlice.reducer;
