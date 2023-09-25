import { createSlice } from '@reduxjs/toolkit'
import { getDefaultResponsiveLayouts, getDefaultWidgets } from './layout';

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
      state.selectedWidget = state.widgets.find((w:any) => w.i === state.selectedWidgetKey)
    },
    setLayouts: (state, action) => {
      state.layouts = action.payload;
      savePreferences(state.layouts, state.widgets)
    },
    setWidgetValue: (state, action) => {
      let { i, name, value } = action.payload;
      let matchingWidget = state.widgets.find((w: any) => {
        return w.i == i;
      })
      if (matchingWidget) {
        matchingWidget[name] = value;
      }
      savePreferences(state.layouts, state.widgets)
    },
    addWidget: (state, action) => {
      state.widgets.push(action.payload)
      savePreferences(state.layouts, state.widgets)
    },
    removeWidget: (state, action) => {
      if (action.payload == state.selectedWidgetKey) {
        state.selectedWidgetKey = null;
        state.selectedWidget = null;
      }
      state.widgets = state.widgets.filter((w: any) => w.i != action.payload)
      savePreferences(state.layouts, state.widgets)
    }
  },
})

export const { addWidget, removeWidget, setLayouts, setWidgetValue, setSelectedWidgetKey } = dashboardSlice.actions

export default dashboardSlice.reducer