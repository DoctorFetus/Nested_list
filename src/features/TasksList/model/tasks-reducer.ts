import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {findTaskById} from "../../../common/utils/findTaskById.ts";
import {v1} from 'uuid';
import {chooseTasksById} from "../../../common/utils/chooseTasksById.ts";
import {findAndDeleteTask} from "../../../common/utils/deleteTaskById.ts";


export type TasksType = {
    title: string
    description: string
    isDone: boolean
    children: TasksType[]
    id: string
    isChosen: boolean
}

type initialStateType = {
    tasks: TasksType[],
    currentTask: TasksType | null
    idOfTheChosenTasks: string[]
}

const initialState: initialStateType = {
    tasks: [
        {
            id: v1(),
            title: 'Spaghetti Bolognese',
            isDone: false,
            description: ' I plan to make a classic spaghetti bolognese for dinner',
            isChosen: false,
            children: [
                {
                    id: v1(),
                    title: 'Ground Beef',
                    isDone: false,
                    description: ' We\'ll need ground beef as the main protein for the sauce',
                    isChosen: false,
                    children: []
                },
                {
                    id: v1(),
                    title: 'Spaghetti',
                    isDone: false,
                    description: 'Spaghetti noodles are a must for this dish',
                    isChosen: false,
                    children: [
                        {
                            id: v1(),
                            title: 'Tomato Sauce',
                            isDone: true,
                            description: 'Tomato sauce is the base of the Bolognese sauce',
                            isChosen: false,
                            children: []
                        }
                    ]
                },
            ]
        },
        {
            id: v1(),
            title: 'Something else',
            isDone: true,
            children: [],
            description: 'Take something else to your taste!',
            isChosen: false
        }


    ],
    currentTask: null,
    idOfTheChosenTasks: []
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ newTitle: string, id: string | null }>) => {

            const {id, newTitle} = action.payload
            const newTask =
                {
                    id: v1(),
                    description: '',
                    title: newTitle,
                    children: [],
                    isDone: false,
                    isChosen: false
                }
            if (id) {
                const parentTask = findTaskById(state.tasks, id);
                if (parentTask) {
                    parentTask.children.push(newTask);

                }
            } else {
                state.tasks.push(newTask)
            }

        },

        setCurrentTask: (state, action: PayloadAction<{ id: string }>) => {
            state.currentTask = findTaskById(state.tasks, action.payload.id)
        },
        changeTaskStatus: (state, action: PayloadAction<{ id: string }>) => {
            const task = findTaskById(state.tasks, action.payload.id)
            if (task) task.isDone = !task.isDone
        },
        updateTask: (state, action: PayloadAction<{ title: string, descr: string, id: string }>) => {
            const {title, descr, id} = action.payload
            let task = findTaskById(state.tasks, id)
            if (task) {
                task.title = title
                task.description = descr
                state.currentTask = task
            }

        },
        chooseTask: (state, action: PayloadAction<{ id: string }>) => {
            let task = findTaskById(state.tasks, action.payload.id)
            if (task) {
                const chosenTask = chooseTasksById(task, action.payload.id, !task.isChosen)
                task.isChosen = chosenTask.isChosen
                task.children = chosenTask.children

                if (chosenTask.isChosen && !state.idOfTheChosenTasks.some(id => id === chosenTask.id)) {
                    state.idOfTheChosenTasks.push(chosenTask.id)
                } else {
                    const index = state.idOfTheChosenTasks.findIndex(index => index === chosenTask.id)
                    if (index > -1) state.idOfTheChosenTasks.splice(index, 1)
                }

            }
        },

        deleteTasks: (state, action) => {
            for (let taskId of state.idOfTheChosenTasks) {
                findAndDeleteTask(state.tasks, taskId)
                if (state.currentTask && state.currentTask.id === taskId) {
                    state.currentTask = null
                }
            }
        },
        clearId: (state, action) => {
            for (let id of state.idOfTheChosenTasks) {
                let task = findTaskById(state.tasks, id)
                if (task) {
                    const chosenTask = chooseTasksById(task, id, false)
                    if (chosenTask) {
                        task.isChosen = chosenTask.isChosen
                        task.children = chosenTask.children
                    }
                }
            }
            state.idOfTheChosenTasks = []
        }
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions