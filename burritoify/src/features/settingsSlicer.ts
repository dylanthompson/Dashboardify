import { createSlice } from '@reduxjs/toolkit'
import { loadPreferences, mergePreferences } from './persist';

export interface Location {
  name: string;
  latitude: string;
  longitude: string;
}
export interface LocationState {
  location: {[key:string]: Location},
  
}

const prefs = loadPreferences();

const initialState: LocationState = {
  location: { ...prefs.location }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.location.mylocation = action.payload;
      mergePreferences({"location": state.location})
    },
  },
})

export const { setMyLocation } = settingsSlice.actions

export default settingsSlice.reducer