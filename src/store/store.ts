import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './mapSlice';
export const store = configureStore({
  reducer: {
    // toolbar: toolbarReducer,
    map: mapReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mapMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


/** 
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './mapSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


**/