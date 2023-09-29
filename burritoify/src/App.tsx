import logo from "./logo.svg"
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
import { SnackbarProvider } from "notistack"
import Footer from "./features/footer/Footer"

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

  let getFooter = () => {
    if (view === "Edit") {
      return (
        <Footer />
      )
    } else {
      return null;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={4000}>
        <CssBaseline />
        <CssVarsProvider />
          <div className="App">
            <Dashboard />
            {getFooter()}
          </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
