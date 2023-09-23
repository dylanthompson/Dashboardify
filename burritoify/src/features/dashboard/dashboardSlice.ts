import { createSlice } from '@reduxjs/toolkit'
import { getDefaultResponsiveLayouts, getDefaultWidgets } from './layout';

export interface DashboardWidgetState {
  widgets: any[],
  layouts: {[key: string]: any},
  selectedWidgetKey: string
}

const initialState: DashboardWidgetState = {
  widgets: getDefaultWidgets(),
  layouts: getDefaultResponsiveLayouts(),
  selectedWidgetKey: null
}

function savePreferences(layouts: any, widgets?: any[]) {
  if (typeof localStorage !== 'undefined') {
    let appDataString = localStorage.getItem("appData");
    if (appDataString) {
      let appData = JSON.parse(appDataString);
      appData.layouts = layouts;
      if (widgets) {
        appData.widgets = widgets;
      }
      localStorage.setItem(
        "appData",
        JSON.stringify(appData)
      );
    }  else {
      let newAppData: any = {
        layouts: layouts
      }
      if (widgets) {
        newAppData.widgets = widgets;
      }
      localStorage.setItem(
        "appData",
        JSON.stringify(newAppData)
      );

    }
  }
}


function loadPreferences() {
  let ls: any = {};
  if (typeof localStorage !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem("appData")) || null;
    } catch (e) {
      /*Ignore*/
    }
  }
  return null;
}

const dashboardSlice = createSlice({
  name: 'dashboardWidgets',
  initialState: loadPreferences() != null ? loadPreferences() : initialState,
  reducers: {
    setSelectedWidgetKey: (state, action) => {
      state.selectedWidgetKey = action.payload;
    },
    setLayouts: (state, action) => {
      state.layouts = action.payload;
      savePreferences(state.layouts, state.widgets)
    },
    setWidgets: (state, action) => {
      state.widgets = action.payload;
      savePreferences(state.layouts, state.widgets)
    },
    addWidget: (state, action) => {
      state.widgets.push(action.payload)
      savePreferences(state.layouts, state.widgets)
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter((w: any) => w.i != action.payload)
      savePreferences(state.layouts, state.widgets)
    }
  },
})

export const { addWidget, removeWidget, setLayouts, setWidgets, setSelectedWidgetKey } = dashboardSlice.actions

export default dashboardSlice.reducer