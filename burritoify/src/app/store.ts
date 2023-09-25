import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import dashboardWidgetsReducer from "../features/dashboard/dashboardSlice"
import viewReducer from "../features/viewSlicer"
import settingsReducer from "../features/settingsSlicer"

export const store = configureStore({
  reducer: {
    dashboardWidgets: dashboardWidgetsReducer,
    view: viewReducer,
    settings: settingsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
