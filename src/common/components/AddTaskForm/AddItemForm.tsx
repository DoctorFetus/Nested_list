import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import s from './AddItemForm.module.css'
type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
    hint: string
}

export const AddItemForm = React.memo(function ({
                                                    addItem,
                                                    disabled = false,
                                                    hint
                                                }: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title)
            setTitle("")
        } else {
            setError("Text is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

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
                <AddIcon />
            </IconButton>
        </div>
    )
})
