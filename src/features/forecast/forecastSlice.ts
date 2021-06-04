import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchForecast, DailyForecast } from  '../../service/openData';

type IdleState = {
  kind: 'Idle';
}
type LoadingState = {
  kind: 'Loading';
  regionId: number;
}
type LoadedState = {
  kind: 'Loaded';
  regionId: number;
  forecast: Array<DailyForecast>;
}
type FailedState = {
  kind: 'Failed';
  regionId: number;
  error: string;
}

type State = IdleState | LoadingState | LoadedState | FailedState;
type ForecastState = {
  innerState: State;
}

const initialState: ForecastState = {
  innerState: { kind: 'Idle'},
};

export const loadForecast = createAsyncThunk<Array<DailyForecast>, number, { state: RootState }>(
  'forecast/load',
  async (regionId: number) => fetchForecast(regionId),
  {
    condition(regionId, { getState }) {
      const { innerState } = getState().forecast;
      const isAlreadyLoadingRegion = (innerState.kind === 'Loaded' || innerState.kind === 'Loading') && innerState.regionId === regionId;

      if (isAlreadyLoadingRegion) {
        return false; // Returning false cancels this thunk action
      }
    }
  }
);

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadForecast.pending, (state, action) => {
        const regionIdForecast = action.meta.arg;
        state.innerState = {kind: 'Loading', regionId: regionIdForecast};
      })
      .addCase(loadForecast.fulfilled, (state, action) => {
        const regionIdForecast = action.meta.arg;
        // Fulfilled forecast might be for an old region
        const shouldIgnoreAction = state.innerState.kind !== 'Idle' && state.innerState.regionId !== regionIdForecast;
        if (shouldIgnoreAction) {
          return;
        }

        state.innerState = {
          kind: 'Loaded',
          forecast: action.payload ,
          regionId: regionIdForecast,
        }
      })
      .addCase(loadForecast.rejected, (state, action) => {
        const regionIdForecast = action.meta.arg;

        // Rejected forecast might be for an old region
        const shouldIgnoreAction = state.innerState.kind !== 'Idle' && state.innerState.regionId !== regionIdForecast;

        if (shouldIgnoreAction) {
          return;
        }
        state.innerState = {
          kind: 'Failed',
          error: action.error.message || '',
          regionId: regionIdForecast
        }
      });
  },
});


export const selectForecast = (state: RootState): Array<DailyForecast> => {
  const { innerState } = state.forecast;
  if (innerState.kind === 'Loaded') {
    return innerState.forecast;
  }

  return [];
}

export default forecastSlice.reducer;
