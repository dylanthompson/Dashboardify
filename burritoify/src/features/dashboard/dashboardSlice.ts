import { createSlice } from '@reduxjs/toolkit'
import { getDefaultResponsiveLayouts, getDefaultWidgets } from './layout';
import { loadPreferences, mergePreferences } from '../persist';

export interface DashboardWidgetState {
  widgets: any[],
  layouts: {[key: string]: any},
  selectedWidgetKey: string,
  selectedWidget: string

}

const initialState: DashboardWidgetState = {
  widgets: getDefaultWidgets(),
  layouts: getDefaultResponsiveLayouts(),
  selectedWidgetKey: null,
  selectedWidget: null,
}

const dashboardSlice = createSlice({
  name: 'dashboardWidgets',
  initialState: loadPreferences() != null ? loadPreferences() : initialState,
  reducers: {
    setSelectedWidgetKey: (state, action) => {
      state.selectedWidgetKey = action.payload;
      state.selectedWidget = state.widgets.find((w:any) => w.i === state.selectedWidgetKey)
    },
    setLayouts: (state, action) => {
      state.layouts = action.payload;
      mergePreferences({
        "layouts": state.layouts,
        "widgets": state.widgets
      })
    },
    setSelectedWidgetValue: (state, action) => {
      let { i, name, value } = action.payload;
      let matchingWidget = state.widgets.find((w: any) => {
        return w.i == i;
      })
      if (matchingWidget) {
        matchingWidget[name] = value;
        if (matchingWidget.i == state.selectedWidgetKey) {
          state.selectedWidget = matchingWidget;
        }
      }
      mergePreferences({
        "layouts": state.layouts,
        "widgets": state.widgets
      })
    },
    addWidget: (state, action) => {
      state.widgets.push(action.payload)
      mergePreferences({
        "layouts": state.layouts,
        "widgets": state.widgets
      })
    },
    removeWidget: (state, action) => {
      if (action.payload == state.selectedWidgetKey) {
        state.selectedWidgetKey = null;
        state.selectedWidget = null;
      }
      state.widgets = state.widgets.filter((w: any) => w.i != action.payload)
      mergePreferences({
        "layouts": state.layouts,
        "widgets": state.widgets
      })
    }
  },
})

export const { addWidget, removeWidget, setLayouts, setSelectedWidgetValue, setSelectedWidgetKey } = dashboardSlice.actions

export default dashboardSlice.reducer