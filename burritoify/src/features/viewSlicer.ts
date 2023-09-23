import { createSlice } from '@reduxjs/toolkit'

export interface ViewState {
  view: "Edit" | "View",
}

const initialState: ViewState = {
  view: "Edit"
}

const viewSlice = createSlice({
  name: 'view',
  initialState: initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    toggleView: (state) => {
      state.view = state.view === 'Edit' ? 'View': 'Edit';
    }
  },
})

export const { setView, toggleView } = viewSlice.actions

export default viewSlice.reducer