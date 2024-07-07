import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {TodoListItem} from "../features/list/list-item/todo-list-item";

describe('TodoListItem', () => {
    const mockTask = {
        id: '1',
        name: 'Test Task',
        completed: false,
    };

    const mockOnComplete = jest.fn();

    it('should render the task name correctly', () => {
        const { getByText } = render(<TodoListItem task={mockTask} onComplete={mockOnComplete} />);
        expect(getByText('Test Task')).toBeInTheDocument();
    });

    it('should render the unchecked icon when the task is not completed', () => {
        const { getByTestId } = render(<TodoListItem task={mockTask} onComplete={mockOnComplete} />);
        expect(getByTestId('unchecked-radio-one')).toBeInTheDocument();
    });

    it('should render the unchecked icon when the task is not completed', () => {
        const { getByTestId } = render(<TodoListItem task={mockTask} onComplete={mockOnComplete} />);
        expect(getByTestId('unchecked-radio-two')).toBeInTheDocument();
    });

    it('should render the checked icon when the task is completed', () => {
        const completedTask = { ...mockTask, completed: true };
        const { getByTestId } = render(<TodoListItem task={completedTask} onComplete={mockOnComplete} />);
        expect(getByTestId('checked-circle')).toBeInTheDocument();
    });

    it('should call the onComplete function when the task is clicked', () => {
        const { getByLabelText } = render(<TodoListItem task={mockTask} onComplete={mockOnComplete} />);
        const button = getByLabelText('buttonClick');
        fireEvent.click(button);
        expect(mockOnComplete).toHaveBeenCalledWith(mockTask.id);
    });
});