import {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {tasksActions} from "../../../../features/TasksList/model/tasks-reducer.ts";
import {currentTaskSelector} from "../../../selectors/selectors.ts";

export const useEditModeBar = () => {

    const currentTask = useSelector(currentTaskSelector)

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(() =>  currentTask!.title)
    const [descr, setDescr] = useState(() =>  currentTask!.description)
    const dispatch = useDispatch()

    useEffect(() => {
        setTitle(currentTask!.title);
        setDescr(currentTask!.description);
        setEditMode(false)
    }, [currentTask]);

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeTask = () => {
        dispatch(tasksActions.updateTask({id: currentTask!.id, title, descr}))
        setEditMode(false)
    }

    const setDescriptionHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        setDescr(e.currentTarget.value)
    }

    return {changeTask, editMode, setTitleHandler, title, descr, setEditMode, setDescriptionHandler}
}