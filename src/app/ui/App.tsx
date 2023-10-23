import './App.css'
import Stuffing from "../../features/Stuffing/ui/Stuffing.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {useAppTheme} from "../model/useAppTheme.ts";

function App() {

    const theme = useAppTheme()
    debugger
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={'container'}>
                <Stuffing/>
            </div>
        </ThemeProvider>
    )
}

export default App
