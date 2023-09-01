import s from './display.module.css'
import TasksList from "../tasksList/TasksList.tsx";
import TaskText from "../taskText/TaskText.tsx";
import React from "react";
import {useDispatch} from "react-redux";
import {tasksActions} from "../tasksList/tasks-reducer.ts";
import {AddItemForm} from "../../common/components/AddTaskForm/AddItemForm.tsx";

const Display = () => {
    const dispatch = useDispatch()

    const addTask = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: null}))
    }

    return (
        <div>
            <AddItemForm addItem={addTask} hint={'Add task'}/>
        <div className={s.container}>
            <TasksList/>
            <TaskText/>
        </div>
        </div>
    );
};

export default Display;