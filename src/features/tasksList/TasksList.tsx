import s from './TasksList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store.ts";
import {tasksActions, TasksType} from "./tasks-reducer.ts";
import React from "react";
import {Task} from "../../common/components/Task.tsx";

const TasksList = () => {

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks.tasks)

    const dispatch = useDispatch()

    const findTaskHandler = (id: string) => {
        dispatch(tasksActions.setCurrentTask({id}))
    }

    const changeTaskStatusHandler = (id: string) => {
        dispatch(tasksActions.changeTaskStatus({id}))
    }

    const chooseTaskHandler = (id: string) => {
        dispatch(tasksActions.chooseTask({id}))
    }


    return (
        <div className={s.container}>
            {tasks.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                    findTaskHandler={findTaskHandler}
                    changeTaskStatusHandler={changeTaskStatusHandler}
                    chooseTaskHandler={chooseTaskHandler}
                />
            })}
        </div>
    );
};

export default TasksList;