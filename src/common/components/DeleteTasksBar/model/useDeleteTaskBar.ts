import {useDispatch, useSelector} from "react-redux";
import {appActions} from "../../../../app/model/app-reducer.ts";
import {tasksActions} from "../../../../features/TasksList/model/tasks-reducer.ts";
import {chosenTasksSelector, isChooseModeSelector} from "../../../selectors/selectors.ts";

export const useDeleteTaskBar = () => {
    const isChooseMode = useSelector(isChooseModeSelector)
    const chosenTasks = useSelector(chosenTasksSelector)

    const dispatch = useDispatch()

    const setChooseModeHandler = (isChooseMode: boolean) => {
        dispatch(appActions.setChooseMode({isChooseMode}))
        if (!isChooseMode) dispatch(tasksActions.clearId({}))
    }

    const deleteTaskHandler = () => {
        dispatch(tasksActions.deleteTasks({}))
    }

    const isDeleteButtonDisabled = !chosenTasks.length

    return {isChooseMode, setChooseModeHandler, deleteTaskHandler, isDeleteButtonDisabled}
}