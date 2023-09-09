import s from './TasksList.module.css'
import React from "react";
import {Task} from "../../../common/components/Task/ui/Task.tsx";
import {useTaskList} from "../model/useTaskList.ts";

type TaskListProps = {searchValue: string }

const TasksList = ({searchValue}: TaskListProps) => {

    const {tasksForRender} = useTaskList(searchValue)

    return (
        <div className={s.container}>
              {tasksForRender.length ? tasksForRender.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                />
            })
              :  <div className={s.emptyList}>Your task list are empty...</div> }
        </div>
    );
};

export default TasksList;