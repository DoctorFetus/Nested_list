import s from './TaskText.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store.ts";
import Typography from "@mui/material/Typography";
import {tasksActions, TasksType} from "../tasksList/tasks-reducer.ts";
import EditModeBar from "../../common/components/EditModeBar/EditModeBar.tsx";
import {AddItemForm} from "../../common/components/AddTaskForm/AddItemForm.tsx";
import classNames from "classnames";
import {Paper} from "@mui/material";

const TaskText = () => {

    const currentTask = useSelector<AppRootStateType, TasksType | null>(state => state.tasks.currentTask)
    const dispatch = useDispatch()

    const addSubtask = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: currentTask!.id}))
    }

    if (!currentTask) return  <div className={classNames(s.container, s.title, s.greeting)}>Choose some task!</div>

    return (
        <Paper elevation={6} className={s.container}>
            <div className={s.title}>{currentTask.title}</div>
            <div className={s.description}>{currentTask.description}</div>

            <div className={s.editBar}>
                <EditModeBar
                    currentTask={currentTask}/>
            </div>
            <div className={s.addItem}>
                <AddItemForm addItem={addSubtask} hint={'Add subtask'}/>
            </div>
        </Paper>
    );
};

export default TaskText;