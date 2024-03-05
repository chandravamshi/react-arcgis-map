import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolbarState {
  sda: boolean;
  layerAdd: boolean;
  layerRemove: boolean;
  zoomIn: boolean;
  zoomOut: boolean;
}

const initialState: ToolbarState = {
  sda: false,
  layerAdd: false,
  layerRemove: false,
  zoomIn: false,
  zoomOut: false,
};

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    toggleButton: (state, action: PayloadAction<keyof ToolbarState>) => {
      state[action.payload] = !state[action.payload];
      // Here you would typically also handle side effects or async actions
    }
  },
});

export const { toggleButton } = toolbarSlice.actions;

export default toolbarSlice.reducer;