import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices/app-slice";
import { gameReducer } from "./slices/game-slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    app: appReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
