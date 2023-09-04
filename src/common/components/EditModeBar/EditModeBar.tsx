import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {tasksActions, TasksType} from "../../../features/tasksList/tasks-reducer.ts";
import {useDispatch} from "react-redux";
import s from './EditModeBar.module.css'


const EditModeBar = (props: { currentTask: TasksType }) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(() => props.currentTask.title)
    const [descr, setDescr] = useState(() => props.currentTask.description)
    const dispatch = useDispatch()

    useEffect(() => {
        setTitle(props.currentTask.title);
        setDescr(props.currentTask.description);
        setEditMode(false)
    }, [props.currentTask]);

    const changeTask = () => {
        dispatch(tasksActions.updateTask({id: props.currentTask.id, title, descr}))
        setEditMode(false)
    }

    return (
        <div className={s.container}>
            {editMode ? <>
                    <TextField sx={TextFiledStyle} label={'Title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                    <TextField sx={TextFiledStyle} maxRows={10} multiline label={'Description'} value={descr} onChange={(e) => setDescr(e.currentTarget.value)}/>
                    <Button variant={'contained'} onClick={() => changeTask()}>SAVE</Button>
                </>
                : <Button variant={'contained'} className={s.editModeBtn} onClick={() => setEditMode(!editMode)}>EDIT</Button>}
        </div>
    );
};


const TextFiledStyle = {
    display: 'block',
    marginBottom: '20px'
}

export default EditModeBar;