import React from "react"
import {IconButton, TextField} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import s from './AddItemForm.module.css'
import {useAddItemForm} from "../model/useAddItemform.ts";

export const AddItemForm = React.memo(({addItem, disabled = false, hint}: AddItemFormType) => {

    const {addItemHandler, onChangeHandler, error,
        title, onKeyPressHandler} = useAddItemForm({addItem})

    return (
        <div className={s.container}>
            <TextField
                variant="standard"
                disabled={disabled}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={hint}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} disabled={disabled}>
                <AddIcon/>
            </IconButton>
        </div>
    )
})

export type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
    hint: string
}