import React, {useCallback} from 'react';
import List from '@mui/material/List';
import {useAppDispatch} from "../../app/hooks";
import {
    completeTask,
    Task
} from "../../components/task/task-slice";
import {TodoListItem} from "./list-item/todo-list-item";

interface TodoListProps {
    tasks: Task[]
}

export const TodoList: React.FC<TodoListProps> = ({tasks}) => {
    const dispatch = useAppDispatch();

    const handleCompleteTask = useCallback((id: string) => {
        dispatch(completeTask(id));
    }, [dispatch])

    return (
        <List sx={{ width: '100%' }}>
            {tasks && tasks.map((task) => (
                <TodoListItem key={task.id} task={task} onComplete={handleCompleteTask} />
            ))}
        </List>
    );
};