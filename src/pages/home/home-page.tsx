import React, {useCallback, useEffect, useMemo} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    addTask,
    deleteTask,
    selectActiveTasks,
    selectCompletedTasks,
    selectTasks
} from "../../components/task/task-slice";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {Button, ButtonProps, Tooltip, useTheme} from "@mui/material";
import {TodoList} from "../../features/list/todo-list";

const BUTTON_ACTION = ['all', "active", "completed"];
export const HomePage = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const tasks = useAppSelector(selectTasks);
    const activeTasks = useAppSelector(selectActiveTasks);
    const completedTasks = useAppSelector(selectCompletedTasks);

    const [open, setOpen] = React.useState(false);
    const [newTodo, setNewTodo] = React.useState('');
    const [activeButton, setActiveButton] = React.useState(BUTTON_ACTION[0]);

    useEffect(() => {
        if (tasks && tasks.length) {
            setOpen(true);
        }
    }, [tasks]);

    const selectedTasks = useMemo(() => {
        switch (activeButton) {
            case BUTTON_ACTION[0]:
                return tasks;
            case BUTTON_ACTION[1]:
                return activeTasks;
            case BUTTON_ACTION[2]:
                return completedTasks;
        }
        return [];
    }, [activeButton, tasks, activeTasks, completedTasks])

    const handleExpandClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleNewTodoChange = useCallback((value: string) => {
        setNewTodo(value);
    }, []);

    const handleAddTodo = useCallback(() => {
        dispatch(addTask(newTodo));
        setNewTodo("");
    }, [dispatch, newTodo]);

    const handleActiveButton = useCallback((action: string) => {
        setActiveButton(action);
    }, [])

    const handleClearCompletedTasks = useCallback(() => {
        if (completedTasks) {
            completedTasks.forEach((task) => {
                dispatch(deleteTask(task.id));
            });
        }
    }, [completedTasks]);

    return (
        <Card sx={{width: "100%", maxWidth: "35rem"}}>
            <CardHeader
                disableTypography
                action={
                    <>
                        <Box display="flex" alignItems="center">
                            <TextField
                                autoFocus
                                value={newTodo}
                                multiline
                                onChange={(e) => handleNewTodoChange(e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        handleAddTodo();
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton onClick={handleExpandClick}>
                                            {open ? (
                                                <ExpandMoreIcon sx={{fontSize: "1.5rem"}}/>
                                            ) : (
                                                <ExpandLessIcon sx={{fontSize: "1.5rem"}}/>
                                            )}
                                        </IconButton>
                                    ),
                                    endAdornment: (
                                        <Tooltip title="Add a new task">
                                            <IconButton onClick={handleAddTodo} data-testid="Add-new-task">
                                                <AddIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                }}
                                inputProps={{
                                    maxLength: 100,
                                }}
                                fullWidth
                                variant="standard"
                                sx={{
                                    border: "none",
                                    fontStyle: 'italic',
                                    '& .MuiOutlinedInput-input': {
                                        overflowWrap: 'break-word',
                                    },
                                    "& .MuiInputBase-root": {
                                        padding: "0.5rem"
                                    },
                                    '& .MuiInputBase-root .Mui-disabled': {
                                        textDecoration: 'line-through',
                                    },
                                }}
                            />
                        </Box>
                        <Divider/>
                    </>
                }
                sx={{
                    width: "100%",
                    padding: 0,
                    display: "unset",
                    "& .MuiCardHeader-action": {
                        width: "100%",
                    }
                }}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                <CardContent sx={{
                    padding: 0,
                    "& .MuiFormControl-root": {
                        width: "100%"
                    },
                    '&:last-child': {
                        paddingBottom: 0,
                    },
                }}>
                    <TodoList tasks={selectedTasks}/>
                </CardContent>
            </Collapse>
            {open && (
                <Box display="flex" sx={{justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem"}}>
                    <Typography variant="body2" sx={{color: theme.palette.grey[600]}}>{activeTasks ? activeTasks.length : 0} items left</Typography>
                    <Box sx={{display: "flex", gap: "0.5rem"}}>
                        {BUTTON_ACTION.map((action, index) => (
                            <Button
                                key={index}
                                variant={activeButton === action ? "outlined" : "text"}
                                size="small"
                                sx={{letterSpacing: 0, color: theme.palette.grey[800]}}
                                onClick={() => handleActiveButton(action)}
                            >
                                {action}
                            </Button>
                        ))}
                    </Box>
                    <Button
                        size="small"
                        sx={{letterSpacing: 0, color: theme.palette.grey[600]}}
                        onClick={handleClearCompletedTasks}>
                        Clear completed
                    </Button>
                </Box>
            )}
        </Card>
    )
}