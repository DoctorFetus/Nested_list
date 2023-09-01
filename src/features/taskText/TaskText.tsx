import s from './TaskText.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store.ts";
import Typography from "@mui/material/Typography";
import {TasksType} from "../tasksList/tasks-reducer.ts";
import {useState} from "react";

const TaskText = () => {

    const currentTask = useSelector<AppRootStateType, TasksType | null>(state => state.tasks.currentTask)

    const [editMode, setEditMode] = useState(false)

    if (!currentTask) return <Typography className={s.container}>Choose some task!</Typography>

    return (
        <div className={s.container}>
            <h1>{currentTask.title}</h1>
            <div>{currentTask.description}</div>
            {}
        </div>
    );
};

export default TaskText;