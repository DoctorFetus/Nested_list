import {AppRootStateType} from "../../app/model/store.ts";
import {themeType} from "../../app/model/app-reducer.ts";
import {TasksType} from "../../features/TasksList/model/tasks-reducer.ts";

export const isChooseModeSelector = (state: AppRootStateType): boolean => state.app.chooseMode

export const chosenTasksSelector = (state: AppRootStateType): string[] => state.tasks.idOfTheChosenTasks

export const themeSelector = (state: AppRootStateType): themeType => state.app.theme

export const tasksSelector = (state: AppRootStateType): TasksType[] => state.tasks.tasks

export const currentTaskSelector = (state: AppRootStateType): TasksType | null => state.tasks.currentTask