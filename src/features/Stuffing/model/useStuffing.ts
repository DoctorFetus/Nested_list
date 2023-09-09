import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {tasksActions} from "../../TasksList/model/tasks-reducer.ts";

export const useStuffing = () => {

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('')
    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const addTaskHandler = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: null}))
    }

    return {searchValue, searchInputHandler, addTaskHandler}
}