import logo from "./logo.svg"
import { Header } from "./features/header/Header"
import { Dashboard } from "./features/dashboard/Dashboard"
import { ToolBar } from "./features/toolbar/Toolbar"
import "./App.css"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { setView, toggleView } from "./features/viewSlicer"
import { setSelectedWidgetKey } from "./features/dashboard/dashboardSlice"
import Inspector from "./features/inspector/Inspector"

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  let dispatch = useAppDispatch();
  let view = useAppSelector((state) => state.view.view);
  let selectedWidgetKey = useAppSelector((state) => state.dashboardWidgets.selectedWidgetKey);

  useEffect(() => {
    function handleKeyDown(e: any) {
      if (e.keyCode == 27) {
        if (selectedWidgetKey) {
          dispatch(setSelectedWidgetKey(null));
        } else {
          dispatch(toggleView());
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedWidgetKey]);

  

  let getHeader = () => {
    if (view === "Edit") {
      return (
          <Header />
      )
    } else {
      return null;
    }
  }

  let getFooter = () => {
    if (view === "Edit") {
      return (
          <ToolBar />
      )
    } else {
      return null;
    }
  }
  let getInspector = () => {
    if (view === 'Edit') {
      return (
        <Inspector />
      )
    } else {
      return null;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CssVarsProvider />
        <div className="App">
          {getHeader()}
          <Dashboard />
          {getFooter()}
          {getInspector()}
        </div>
        
    </ThemeProvider>
  )
}

export default App
