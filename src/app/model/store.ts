import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../../features/TasksList/model/tasks-reducer.ts";
import {appReducer} from "./app-reducer.ts";


let preloadedState
const localStorageState = localStorage.getItem('app-state')
if (localStorageState) {
    preloadedState = JSON.parse(localStorageState)
}


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        app: appReducer
    },
    preloadedState
})

store.subscribe(() => {
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

export type AppRootStateType = ReturnType<typeof store.getState>