import taskReducer, {
    addTask,
    completeTask,
    deleteTask,
    TaskState
} from '../components/task/task-slice';
import {PayloadAction} from '@reduxjs/toolkit';
describe('taskSlice', () => {
    const initialState: TaskState = {
        tasks: [],
    };

    it('should handle initial state with empty tasks', () => {
        expect(taskReducer(initialState, { type: 'unknown' })).toEqual({
            tasks: [],
        });
    });

    it('should handle adding a new task', () => {
        const newState = taskReducer(initialState, addTask('Buy groceries'));
        expect(newState.tasks).toEqual([
            { id: expect.any(String), name: 'Buy groceries', completed: false },
        ]);
    });

    it('should handle completing a task', () => {
        const state = taskReducer(initialState, addTask('Do laundry'));
        const newState = taskReducer(state, completeTask(state.tasks[0].id) as PayloadAction<string>);
        expect(newState.tasks[0].completed).toBe(true);
    });

    it('should handle deleting a task', () => {
        const state = taskReducer(initialState, addTask('Clean the house'));
        const newState = taskReducer(state, deleteTask(state.tasks[0].id) as PayloadAction<string>);
        expect(newState.tasks).toEqual([]);
    });
});
