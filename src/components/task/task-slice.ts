import {RootState} from "../../app/store";
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string;
    name: string;
    completed: boolean;
}

export interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: { payload: string }) => {
            const newTask: Task = {
                id: uuidv4(),
                name: action.payload,
                completed: false,
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask: (state, action: PayloadAction<string>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].completed = true;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action: { payload: string }) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const {
    addTask,
    completeTask,
    deleteTask
} = taskSlice.actions;
export const selectTasks = (state: RootState) => state.taskSlice.tasks;

export const selectActiveTasks = createSelector(
    [(state: RootState) => state.taskSlice.tasks],
    (tasks) => {
        return tasks.filter((task) => !task.completed);
    }
)

export const selectCompletedTasks = createSelector(
    [(state: RootState) => state.taskSlice.tasks],
    (tasks) => {
        return tasks.filter((task) => task.completed);
    }
)

export default taskSlice.reducer;