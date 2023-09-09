import React from 'react';
import {IconButton} from "@mui/material";
import {appActions} from "../../../app/model/app-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {themeSelector} from "../../selectors/selectors.ts";

export const ChangeThemeButton = () => {

    const theme = useSelector(themeSelector)
    const dispatch = useDispatch()

    const changeThemeHandler = () => {
        dispatch(appActions.setTheme({}))
    }


    return (
        <>
            <IconButton sx={{ ml: 1 }} onClick={changeThemeHandler} color="inherit">
                {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </>
    );
};
