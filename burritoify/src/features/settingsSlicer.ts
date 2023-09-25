import { createSlice } from '@reduxjs/toolkit'

export interface Location {
  name: string;
  latitude: string;
  longitude: string;
}
export interface LocationState {
  location: {[key:string]: Location},
}

const initialState: LocationState = {
  location: { mylocation: null }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    }
  },
})

export const { setLocation } = settingsSlice.actions

export default settingsSlice.reducer