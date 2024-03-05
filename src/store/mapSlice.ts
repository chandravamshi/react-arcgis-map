// src/store/mapSlice.ts
import { ActionCreatorWithPayload, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Envelope {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface MapState {
  scale: number;
  minScale: number,
  maxScale: number,
  sketchMode: "none" | "zoomIn" | "zoomOut" | "pan" | "info" | 'select' | 'unSelect';
  history: number[];
  currentPosition: number;
  spatialReference: number;
  envelope: Envelope;
}
export const defaultScale: number = 1153185

const initialState: MapState = {
  scale: defaultScale,
  minScale: 0,
  maxScale: 0,
  sketchMode: "pan",
  history: [1153185],
  currentPosition: 0,
  spatialReference: 31464,
  envelope: {
    xmin: 4401302,
    ymin: 56447020,
    xmax: 4582172,
    ymax: 5878914,
  }
};


export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {

    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setMinScale: (state, action) => {
      state.minScale = action.payload;
    },
    setMaxScale: (state, action) => {
      state.maxScale = action.payload;
    },
    resetScale: (state) => {
      state.scale = defaultScale;
    },
    setSketchMode: (state, action: PayloadAction<MapState["sketchMode"]>) => {
      state.sketchMode = action.payload;
    },
    resetModes: (state) => {
      state.sketchMode = 'none';
    },
    addToHistory: (state, action: PayloadAction<number>) => {
      state.history.push(action.payload);
      state.currentPosition = state.currentPosition + 1;
    },
    navigateHistoryBackward: (state) => {
      state.currentPosition = Math.max(state.currentPosition - 1, 0)
    },
    navigateHistoryForward: (state) => {
      state.currentPosition = Math.min(state.currentPosition + 1, state.history.length - 1)
    },
    resetHistory: (state) => {
      state.history = [];
      state.currentPosition = -1;
    },
  },
});

export const { setScale, setMinScale, setMaxScale, resetScale, setSketchMode, resetModes, addToHistory, navigateHistoryBackward, navigateHistoryForward } = mapSlice.actions;

export type ActionType = ReturnType<typeof mapSlice.actions[keyof typeof mapSlice.actions]>;

export default mapSlice.reducer;