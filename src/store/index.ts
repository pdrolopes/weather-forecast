import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import regionReducer from './region';
import forecastReducer from './forecast';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    region: regionReducer,
    forecast: forecastReducer,
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
