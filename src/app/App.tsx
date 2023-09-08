import './App.css'
import Display from "../features/display/Display.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme} from "@mui/material/styles";
import {blue, green, purple} from "@mui/material/colors";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store.ts";

function App() {

    const themeMode = useSelector<AppRootStateType, 'light' | 'dark'>(state => state.app.theme)

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: themeMode === 'dark' ? purple[500] : blue[600],
            }
        },

    })


  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
    <div className={'container'}>
        <Display />
    </div>
      </ThemeProvider>
  )
}

export default App
