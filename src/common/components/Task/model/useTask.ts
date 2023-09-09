import {tasksActions, TasksType} from "../../../../features/TasksList/model/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {isChooseModeSelector} from "../../../selectors/selectors.ts";

export const useTask = (task: TasksType) => {

    const isChooseMode = useSelector(isChooseModeSelector)
    const [expanded, setExpanded] = useState(false);

    const dispatch = useDispatch()

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const isExpandMoreVisible = !task.children.length ? {display: 'none'} : {}

    const chooseTaskHandler = (id: string, event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        const tagChildren = target.childNodes

        if (isChooseMode && tagChildren.length && tagChildren[0].nodeName === 'SPAN') {
            dispatch(tasksActions.chooseTask({id}))
        }
    }

    const findTaskHandler = (id: string) => {
        dispatch(tasksActions.setCurrentTask({id}))
    }

    const changeTaskStatusHandler = (id: string) => {
        dispatch(tasksActions.changeTaskStatus({id}))
    }



    return {findTaskHandler, changeTaskStatusHandler, expanded, handleExpand, isExpandMoreVisible, chooseTaskHandler}
}