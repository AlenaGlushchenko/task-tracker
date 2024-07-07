import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {TodoList} from "../features/list/todo-list";

jest.mock('../app/hooks', () => ({
    useAppDispatch: jest.fn(),
}));


describe('TodoList', () => {
    const mockTasks = [
        { id: '1', name: 'Task 1', completed: false },
        { id: '2', name: 'Task 2', completed: true },
        { id: '3', name: 'Task 3', completed: false },
    ];

    it('should render all tasks', async () => {
        const { findByText } = render(<TodoList tasks={mockTasks} />);
        for (const task of mockTasks) {
            await waitFor(() => expect(findByText(task.name)).resolves.toBeInTheDocument());
        }
    });

    it('should update the rendered tasks when the task list changes', async () => {
        const { rerender, getByText } = render(<TodoList tasks={mockTasks} />);

        for (const task of mockTasks) {
            await waitFor(() => expect(getByText(task.name)).toBeInTheDocument());
        }

        const updatedTasks = [
            ...mockTasks,
            { id: '4', name: 'New Task', completed: false },
        ];
        rerender(<TodoList tasks={updatedTasks} />);

        await waitFor(() => expect(getByText('New Task')).toBeInTheDocument());
    });
});
