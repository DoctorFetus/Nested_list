import s from './TasksList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store.ts";
import {tasksActions, TasksType} from "./tasks-reducer.ts";
import React from "react";
import {Task} from "../../common/components/Task/Task.tsx";
import {findTaskByName} from "../../common/utils/findTaskByName.ts";

type TaskListProps = {searchValue: string }

const TasksList = ({searchValue}: TaskListProps) => {

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks.tasks)
    const isChooseMode = useSelector<AppRootStateType>(state => state.app.chooseMode)

    const dispatch = useDispatch()

    const findTaskHandler = (id: string) => {
        dispatch(tasksActions.setCurrentTask({id}))
    }

    const changeTaskStatusHandler = (id: string) => {
        dispatch(tasksActions.changeTaskStatus({id}))
    }

    const chooseTaskHandler = (id: string, event: any) => {

        const tagChildren = event.target.childNodes

        if (isChooseMode && tagChildren.length && tagChildren[0].tagName === 'SPAN') {
            dispatch(tasksActions.chooseTask({id}))
        }
    }

    let tasksForRender = tasks
    if (searchValue) tasksForRender = findTaskByName(tasks, searchValue)

    return (
        <div className={s.container}>
              {tasks.length ? tasksForRender.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                    findTaskHandler={findTaskHandler}
                    changeTaskStatusHandler={changeTaskStatusHandler}
                    chooseTaskHandler={chooseTaskHandler}
                />
            })
              :  <div className={s.emptyList}>Your task list are empty...</div> }
        </div>
    );
};

export default TasksList;