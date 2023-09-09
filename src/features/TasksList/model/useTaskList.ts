import {useSelector} from "react-redux";
import {tasksSelector} from "../../../common/selectors/selectors.ts";
import {filterTasksByName} from "../../../common/utils/filterTasksByName.ts";

export const useTaskList = (searchValue: string) => {
    const tasks = useSelector(tasksSelector)

    let tasksForRender = tasks
    if (searchValue) tasksForRender = filterTasksByName(tasks, searchValue)

    return {tasksForRender}

}