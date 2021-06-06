import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchForecast, DailyForecast as OpenDataForcast } from  '../../service/openData';
import { ForecastType } from '../../types';

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
  forecasts: Array<ForecastType>;
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

export const loadForecast = createAsyncThunk<Array<OpenDataForcast>, number, { state: RootState }>(
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

        const forecasts = action.payload.map(f => ({
          minTemperature: Number(f.tMin),
          maxTemperature: Number(f.tMax),
          chanceOfPrecipitation: Number(f.precipitaProb),
          date: new Date(f.forecastDate)
        }))

        state.innerState = {
          kind: 'Loaded',
          forecasts: forecasts,
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

export const selectForecast = (state: RootState): Array<ForecastType> => {
  const { innerState } = state.forecast;
  if (innerState.kind === 'Loaded') {
    return innerState.forecasts;
  }

  return [];
}
export const selectIsLoading = (state: RootState): boolean => state.forecast.innerState.kind === 'Loading';

export default forecastSlice.reducer;
