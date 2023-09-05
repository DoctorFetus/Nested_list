import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {findTaskById} from "../../common/utils/findTaskById.ts";
import {v1} from 'uuid';
import {chooseTasksById} from "../../common/utils/chooseTasksById.ts";

export type TasksType = {
    title: string
    description: string
    isDone: boolean
    children: TasksType[]
    id: string
    isChosen?: boolean
}

type initialStateType = {
    tasks: TasksType[],
    currentTask: TasksType | null
}

const initialState: initialStateType = {
    tasks: [
        {
            id: v1(),
            title: 'Task 1',
            isDone: false,
            description: 'This is a description for Task 1',
            isChosen: false,
            children: [
                {
                    id: v1(),
                    title: 'Task 1.1',
                    isDone: false,
                    description: 'This is a description for Task 1.1',
                    children: []
                },
                {
                    id: v1(),
                    title: 'Task 1.2',
                    isDone: false,
                    description: 'This is a description for Task 1.2',
                    children: [
                        {
                            id: v1(),
                            title: 'Task 1.2.1',
                            isDone: false,
                            description: 'This is a description for Task 1.2.1',
                            children: []
                        }
                    ]
                },
            ]
        },
        {
            id: v1(),
            title: 'Task 2',
            isDone: false,
            children: [],
            description: 'This is a description for Task 2',
            isChosen: false
        }


    ],
    currentTask: null
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
                    isDone: false
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
                const chosenTask = chooseTasksById(task, action.payload.id)
                task.isChosen = chosenTask!.isChosen
                task.children = chosenTask!.children
            }
        }
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions