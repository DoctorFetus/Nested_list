import s from './display.module.css'
import TasksList from "../tasksList/TasksList.tsx";
import TaskText from "../taskText/TaskText.tsx";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {tasksActions} from "../tasksList/tasks-reducer.ts";
import {AddItemForm} from "../../common/components/AddTaskForm/AddItemForm.tsx";
import Button from "@mui/material/Button";
import {IconButton, TextField} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {appActions} from "../../app/app-reducer.ts";
import {AppRootStateType} from "../../app/store.ts";

const Display = () => {
    const theme = useSelector<AppRootStateType>(state => state.app.theme)
    const dispatch = useDispatch()

    const isChooseMode = useSelector<AppRootStateType>(state => state.app.chooseMode)

    const addTask = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: null}))
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme + ''
    }, [theme])

    const setChooseMode = (isChooseMode: boolean) => {
        dispatch(appActions.setChooseMode({isChooseMode}))
        if (!isChooseMode) dispatch(tasksActions.clearId({}))
    }

    const deleteTask = () => {
        dispatch(tasksActions.deleteTasks({}))
    }

    return (
        <div className={s.container}>
            <div className={s.tools}>
                <AddItemForm addItem={addTask} hint={'Add task'}/>
                {!isChooseMode
                    ? <Button onClick={() => setChooseMode(true)} variant={'outlined'}>choose</Button>
                    : <>
                        <Button variant={'contained'} color={'error'} onClick={() => deleteTask()}>delete</Button>
                        <Button onClick={() => setChooseMode(false)} variant={'outlined'}>cancel</Button>
                    </>}
                <TextField label={'Find task'}></TextField>
                <IconButton onClick={() => dispatch(appActions.setTheme({}))} ><Brightness4Icon/></IconButton>
            </div>
            <div className={s.tasksContainer}>
                <TasksList/>
                <TaskText/>
            </div>
        </div>
    );
};

export default Display;