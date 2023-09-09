import {AddItemFormType} from "../ui/AddItemForm.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = ({addItem}: Pick<AddItemFormType, 'addItem'>) => {

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

    return {addItemHandler, onChangeHandler, error, title, onKeyPressHandler}

}