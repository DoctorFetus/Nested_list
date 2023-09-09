import {useSelector} from "react-redux";
import {AppRootStateType} from "./store.ts";
import {createTheme} from "@mui/material/styles";
import {blue, purple} from "@mui/material/colors";
import {useEffect} from "react";
import {themeSelector} from "../../common/selectors/selectors.ts";

export const useAppTheme = () => {
    const themeMode = useSelector<AppRootStateType, 'light' | 'dark'>(themeSelector)

    useEffect(() => {
        document.documentElement.dataset.theme = themeMode + ''
    }, [themeMode])

    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: themeMode === 'dark' ? purple[500] : blue[600],
            }
        },

    })
}