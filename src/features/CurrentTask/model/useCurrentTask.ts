import {useDispatch, useSelector} from "react-redux";
import {currentTaskSelector} from "../../../common/selectors/selectors.ts";
import {tasksActions} from "../../TasksList/model/tasks-reducer.ts";

export const useCurrentTask = () => {
    const currentTask = useSelector(currentTaskSelector)
    const dispatch = useDispatch()
    const addSubtask = (newTitle: string) => {
        dispatch(tasksActions.addTask({newTitle, id: currentTask!.id}))
    }

    return {currentTask, addSubtask}
}