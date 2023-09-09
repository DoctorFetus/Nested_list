import React from 'react';
import {Button, TextField} from "@mui/material";
import s from './EditModeBar.module.css'
import {useEditModeBar} from "../model/useEditModeBar.ts";


const EditModeBar = () => {


    const {changeTask, editMode, setTitleHandler,
        title, descr, setEditMode,
    setDescriptionHandler} = useEditModeBar()

    return (
        <div className={s.container}>
            {editMode ? <>
                    <TextField sx={TextFiledStyle}
                               label={'Title'}
                               value={title}
                               onChange={setTitleHandler}/>
                    <TextField sx={TextFiledStyle} maxRows={10} multiline label={'Description'}
                               value={descr} onChange={setDescriptionHandler}/>
                    <Button variant={'contained'}
                            onClick={changeTask}>SAVE</Button>
                </>
                : <Button variant={'contained'}
                          className={s.editModeBtn}
                          onClick={() => setEditMode(!editMode)}
                >EDIT</Button>}
        </div>
    );
};

const TextFiledStyle = {
    display: 'block',
    marginBottom: '20px'
}

export default EditModeBar;