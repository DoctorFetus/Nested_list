import {findTaskById} from "./findTaskById.ts";
import {TasksType} from "../../features/tasksList/tasks-reducer.ts";

export const chooseTasksById = (task: TasksType, id: string, isChosen: boolean = true) => {
        if (!task.children.length) {
            return { ...task, isChosen }
        } else {
            for (let i = 0; i < task.children.length; i++) {
                task.isChosen = isChosen
                task.children[i] = chooseTasksById(task.children[i], task.children[i].id, isChosen)
            }
            return task; // Вернуть обновленную задачу с выбранными детьми
        }
}
