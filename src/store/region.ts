import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchRegions } from '../service/openData';
import { RegionType } from '../types';

type FailedState = {
  kind: 'Failed';
  error: string;
};
type LoadedState = {
  kind: 'Loaded';
  regions: Array<RegionType>;
};
type LoadingState = {
  kind: 'Loading';
};
type IdleState = {
  kind: 'Idle';
};

type State = IdleState | LoadingState | LoadedState | FailedState;
type RegionState = {
  innerState: State;
};

const initialState: RegionState = {
  innerState: { kind: 'Idle' },
};

export const loadRegions = createAsyncThunk('region/load', fetchRegions);

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRegions.pending, (state) => {
        state.innerState = { kind: 'Loading' };
      })
      .addCase(loadRegions.fulfilled, (state, action) => {
        const regions = action.payload.map((region) => ({
          id: region.globalIdLocal,
          name: region.local,
          areaId: region.idAreaAviso,
        }));

        state.innerState = {
          kind: 'Loaded',
          regions,
        };
      })
      .addCase(loadRegions.rejected, (state, action) => {
        state.innerState = {
          kind: 'Failed',
          error: action.error.message || '',
        };
      });
  },
});

export const selectRegions = (state: RootState): Array<RegionType> => {
  const { innerState } = state.region;
  if (innerState.kind === 'Loaded') {
    return innerState.regions;
  }

  return [];
};
export const selectIsLoading = (state: RootState): boolean =>
  state.region.innerState.kind === 'Loading';

export default regionSlice.reducer;
