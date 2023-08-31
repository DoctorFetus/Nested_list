import s from './TasksList.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store.ts";
import {TasksType} from "./tasks-reducer.ts";
import React from "react";
import {Task} from "../../common/components/Task.tsx";

const TasksList = () => {

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks)

    return (
        <div className={s.container}>
            {tasks.map(task => {
              return <Task {...task}/>
            })}
        </div>
    );
};

export default TasksList;