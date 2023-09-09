import React from 'react';
import Button from "@mui/material/Button";
import {useDeleteTaskBar} from "../model/useDeleteTaskBar.ts";


const DeleteTasksBar = () => {

    const {isChooseMode, setChooseModeHandler,
        deleteTaskHandler, isDeleteButtonDisabled} = useDeleteTaskBar()

    if (isChooseMode) {
        return <>
            <Button disabled={isDeleteButtonDisabled}
                    variant={'contained'} color={'error'}
                    onClick={deleteTaskHandler}
            >delete</Button>
            <Button onClick={() => setChooseModeHandler(false)}
                    variant={'outlined'}
            >cancel</Button></>

    }
    return (
        <>
            <Button onClick={() => setChooseModeHandler(true)} variant={'outlined'}>choose</Button>
        </>
    )
};

export default DeleteTasksBar;