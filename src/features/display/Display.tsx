import s from './display.module.css'
import TasksList from "../tasksList/TasksList.tsx";
import TaskText from "../taskText/TaskText.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
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
    const isChooseMode = useSelector<AppRootStateType>(state => state.app.chooseMode)
    const chosenTasks = useSelector<AppRootStateType>(state => state.tasks.idOfTheChosenTasks) as string[]
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        document.documentElement.dataset.theme = theme + ''
    }, [theme])


    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const addTask = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: null}))
    }

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
                        <Button disabled={!chosenTasks.length} variant={'contained'} color={'error'} onClick={() => deleteTask()}>delete</Button>
                        <Button onClick={() => setChooseMode(false)} variant={'outlined'}>cancel</Button>
                    </>}
                <TextField value={searchValue} onChange={searchInputHandler} label={'Find task'}></TextField>
                <IconButton onClick={() => dispatch(appActions.setTheme({}))} ><Brightness4Icon/></IconButton>
            </div>
            <div className={s.tasksContainer}>
                <TasksList searchValue={searchValue}/>
                <TaskText/>
            </div>
        </div>
    );
};

export default Display;