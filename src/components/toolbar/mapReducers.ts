/* 

import MapView from "@arcgis/core/views/MapView";
import { MapActionTypes } from "./mapActions";
import Point from "@arcgis/core/geometry/Point";

export interface CToolbarProps {
    view: MapView;
}

export interface MapState {
    zoom: number;
    center: Point;
    history: Action[];
}

// Define Action type for history
export interface Action {
    type: string;
    payload?: any;
}

const initialCenter: Point = new Point({
    latitude: 34.0522, // Default latitude
    longitude: -118.2437, // Default longitude
});

const initialState: MapState = {
    zoom: 13, // Default zoom level
    center: initialCenter,
    history: [],
};


// Action Creators
export const zoomIn = () => ({ type: 'ZOOM_IN' });
export const zoomOut = () => ({ type: 'ZOOM_OUT' });
export const resetMap = () => ({ type: 'RESET_MAP' });
export const viewHistory = () => ({ type: 'VIEW_HISTORY' });

// Reducer
export const mapReducer = (state: MapState = initialState, action: Action) => {
    if (isMapAction(action)) {
        switch (action.type) {
            case 'ZOOM_IN':
                return { ...state, zoom: state.zoom + 1, history: [...state.history, action] };
            case 'ZOOM_OUT':
                return { ...state, zoom: state.zoom - 1, history: [...state.history, action] };
            // Other cases...
            // ... your cases for handling specific actions ...
            default:
                return state;
        }
    }

    return state;
};


// Type guard to check if an action is a MapActionTypes
const isMapAction = (action: any): action is MapActionTypes => {
    return ['ZOOM_IN', 'ZOOM_OUT','RESET_MAP','VIEW_HISTORY'].includes(action.type);
};



/** 
import { createSlice } from '@reduxjs/toolkit';

import { ZOOM_IN, ZOOM_OUT, RESET_MAP, MapActionTypes } from './mapActions';
import { Action } from 'redux';
const initialState = {
  zoomLevel: 13
};
**/
/**
export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
      zoomIn: state => {
        state.zoomLevel += 1;
      },
      zoomOut: state => {
        state.zoomLevel -= 1; 
      },
      reset: state => {
        state.zoomLevel = 13;
      }
    }
  });
  
  export const { zoomIn, zoomOut, reset } = mapSlice.actions;
  
  export default mapSlice.reducer;

 **/
/** 
export const mapReducer = (state = initialState, action: Action | MapActionTypes) => {
 // Check if the action is one of your defined types
 if (isMapAction(action)) {
   switch (action.type) {
     case ZOOM_IN:
       return { ...state, zoomLevel: state.zoomLevel + 1 };
     case ZOOM_OUT:
       return { ...state, zoomLevel: state.zoomLevel - 1 };
     case RESET_MAP:
       return { ...state, zoomLevel: 13 };
     default:
       return state;
   }
 }

 return state;
};

// Helper function to check if an action is a MapActionTypes
const isMapAction = (action: any): action is MapActionTypes => {
 return [ZOOM_IN, ZOOM_OUT, RESET_MAP].includes(action.type);
};

**/
/** 
import { ZOOM_IN, ZOOM_OUT, RESET_MAP } from './mapActions';

const initialState = {
  zoomLevel: 0, // initial zoom level
};

export function mapReducer(state = initialState, action:any) {
    switch (action.type) {
      case ZOOM_IN:
        return { ...state, zoomLevel: state.zoomLevel + 1 };
      case ZOOM_OUT:
        return { ...state, zoomLevel: state.zoomLevel - 1 };
      case RESET_MAP:
        return { ...initialState };
      default:
        return state;
    }
  }

**/
 