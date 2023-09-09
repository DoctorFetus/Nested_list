import {TasksType} from "../../features/TasksList/model/tasks-reducer.ts";


const checkingForSubstring = (task: TasksType, substring: string): TasksType[] => {
    let result = [];

    if (task.title.includes(substring)) {
        const foundedTask = {...task}
        foundedTask.children = []
        result.push(foundedTask);
    }
    for (let subtask of task.children) {
        const foundSubtasks = checkingForSubstring(subtask, substring);
        result = result.concat(foundSubtasks);
    }
    return result;
}


export const filterTasksByName = (tasks: TasksType[], substring: string) => {
    const result = []
    for (let task of tasks) {
        const found = checkingForSubstring(task, substring)
        if (found) result.push(...found)
    }
    return result
}