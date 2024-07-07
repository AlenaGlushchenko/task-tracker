import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
    addTask,
    Task
} from '../components/task/task-slice';
import {HomePage} from "../pages/home/home-page";
import {useAppDispatch, useAppSelector} from "../app/hooks";

jest.mock('../app/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock('../components/task/task-slice', () => ({
    addTask: jest.fn(),
    deleteTask: jest.fn(),
    selectActiveTasks: jest.fn(),
    selectCompletedTasks: jest.fn(),
    selectTasks: jest.fn(),
}));

describe('HomePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a new task', () => {
        const mockDispatch = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

        render(<HomePage />);
        const newTaskInput = screen.getByRole('textbox');
        fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
        fireEvent.keyPress(newTaskInput, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(mockDispatch).toHaveBeenCalledWith(addTask('New Task'));
    });

    it('should open the task list when there are tasks', () => {
        const tasks = [
            { id: 1, title: 'Task 1', completed: false },
        ];
        (useAppSelector as jest.Mock).mockReturnValueOnce(tasks);

        render(<HomePage />);

        expect(screen.getByRole('button', { name: 'Add a new task' })).toBeInTheDocument();
    });

    it('should handle new task input', () => {
        const tasks: Task[] = [];
        (useAppSelector as jest.Mock).mockReturnValueOnce(tasks);

        render(<HomePage />);

        const newTaskInput = screen.getByTestId('Add-new-task');
        fireEvent.change(newTaskInput, { target: { value: 'New Task' } });
        expect(newTaskInput).toHaveValue('New Task');
    });

    it('should display the new task input with the correct', () => {
        const tasks: Task[] = [];
        (useAppSelector as jest.Mock).mockReturnValueOnce(tasks);

        render(<HomePage />);

        const newTaskInput = screen.getByTestId('Add-new-task');
        const addButton = screen.getByRole('button', { name: 'Add a new task' });

        expect(newTaskInput).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveAttribute('aria-label', 'Add a new task');
    });

});