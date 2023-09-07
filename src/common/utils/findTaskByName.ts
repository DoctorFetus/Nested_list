import {TasksType} from "../../features/tasksList/tasks-reducer.ts";


const including = (task: TasksType, substring: string): TasksType[] => {
    let result = [];

    if (task.title.includes(substring)) {
        const foundedTask = {...task}
        foundedTask.children = []
        result.push(foundedTask);
    }
    for (let subtask of task.children) {
        const foundSubtasks = including(subtask, substring);
        result = result.concat(foundSubtasks);
    }
    return result;
}


export const findTaskByName = (tasks: TasksType[], substring: string) => {
    const result = []
    for (let task of tasks) {
        const found = including(task, substring)
        if (found) result.push(...found)
    }
    return result
}