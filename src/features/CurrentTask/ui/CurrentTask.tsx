import s from './CurrentTask.module.css'
import EditModeBar from "../../../common/components/EditModeBar/ui/EditModeBar.tsx";
import {AddItemForm} from "../../../common/components/AddTaskForm/ui/AddItemForm.tsx";
import {Paper} from "@mui/material";
import classNames from 'classnames'
import {useCurrentTask} from "../model/useCurrentTask.ts";


export const CurrentTask = () => {

    const {currentTask, addSubtask} = useCurrentTask()

    if (!currentTask) return  <div className={classNames(s.container, s.title, s.greeting)}>Choose some task!</div>

    return (
        <Paper elevation={6} className={s.container}>
            <div className={s.title}>{currentTask.title}</div>
            <div className={s.description}>{currentTask.description}</div>

            <div className={s.editBar}>
                <EditModeBar/>
            </div>
            <div className={s.addItem}>
                <AddItemForm addItem={addSubtask} hint={'Add subtask'}/>
            </div>
        </Paper>
    );
};
