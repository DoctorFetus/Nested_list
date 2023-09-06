import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/tasksList/tasks-reducer";
import {appReducer} from "./app-reducer.ts";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        app: appReducer
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>