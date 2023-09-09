import s from './Stuffing.module.css'
import TasksList from "../../TasksList/ui/TasksList.tsx";
import React from "react";
import {AddItemForm} from "../../../common/components/AddTaskForm/ui/AddItemForm.tsx";
import {TextField} from "@mui/material";
import DeleteTasksBar from "../../../common/components/DeleteTasksBar/ui/DeleteTasksBar.tsx";
import {ChangeThemeButton} from "../../../common/components/ChangeThemeButton/ChangeThemeButton.tsx";
import {useStuffing} from "../model/useStuffing.ts";
import { CurrentTask } from '../../CurrentTask/ui/CurrentTask.tsx';

const Stuffing = () => {


    const {searchValue, searchInputHandler, addTaskHandler} = useStuffing()

    return (
        <div className={s.container}>
            <div className={s.tools}>
                <AddItemForm addItem={addTaskHandler} hint={'Add task'}/>

                <DeleteTasksBar/>

                <TextField value={searchValue} onChange={searchInputHandler} label={'Find task'}></TextField>

                <ChangeThemeButton />

            </div>
            <div className={s.tasksContainer}>
                <TasksList searchValue={searchValue}/>
                <CurrentTask/>
            </div>
        </div>
    );
};

export default Stuffing;