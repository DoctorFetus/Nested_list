import {TasksType} from "../../features/tasksList/tasks-reducer.ts";

export const findAndDeleteTask = (tasks: TasksType[], taskId: string) => {
    for (let task of tasks) {
        if (task.id === taskId) {
            const index = tasks.findIndex((tk) => tk.id === taskId)
            if (index > -1) {
                tasks.splice(index, 1)
                return true
            }
        } else {
            const deleted = findAndDeleteTask(task.children, taskId)
            if (deleted) return true
        }
    }
    return false
}