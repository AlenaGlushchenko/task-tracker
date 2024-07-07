import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from "../theme/theme-provider/theme-provider-slice";
import taskReducer from "../components/task/task-slice";

export const store = configureStore({
  reducer: {
    themeSlice: themeReducer,
    taskSlice: taskReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
