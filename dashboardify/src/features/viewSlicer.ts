import { createSlice } from '@reduxjs/toolkit'
import { loadPreferences, mergePreferences } from './persist';

export interface ViewState {
  view: "Edit" | "View",
}
let defaultViewName = 'View';

if (typeof localStorage !== 'undefined') {
  let prefs = loadPreferences();
  defaultViewName = prefs.view || 'View';
}

const initialState: ViewState = {
  view: <any>defaultViewName
}

const viewSlice = createSlice({
  name: 'view',
  initialState: initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
      mergePreferences({"view": state.view})
    },
    toggleView: (state) => {
      state.view = state.view === 'Edit' ? 'View': 'Edit';
      mergePreferences({"view": state.view})
    }
  },
})

export const { setView, toggleView } = viewSlice.actions

export default viewSlice.reducer