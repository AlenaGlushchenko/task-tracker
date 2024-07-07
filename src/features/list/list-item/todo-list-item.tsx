import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {Task} from "../../../components/task/task-slice";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material";

interface TodoListItemProps {
    task: Task;
    onComplete: (id: string) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ task, onComplete }) => {
    const theme = useTheme();

    return (
        <>
            <ListItem sx={{ gap: '0.5rem' }}>
                <IconButton
                    aria-label="buttonClick"
                    onClick={() => onComplete(task.id)}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        padding: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& .MuiCardHeader-content': {
                                overflowWrap: 'anywhere',
                            },
                            '& .check-circle': {
                                display: 'none',
                            },
                            '& .unchecked-radio': {
                                display: 'flex',
                            },
                            '&:hover': {
                                '& .check-circle': {
                                    display: 'flex',
                                },
                                '& .unchecked-radio': {
                                    display: 'none',
                                },
                            },
                        }}
                    >
                        {task.completed ? (
                            <CheckCircleRoundedIcon data-testid="checked-circle" sx={{ fontSize: '1.7rem', color: theme.palette.grey[500] }} />
                        ) : (
                            <>
                                <CheckCircleOutlineIcon data-testid="unchecked-radio-one" className="check-circle" sx={{ fontSize: '1.7rem', color: theme.palette.grey[500] }}/>
                                <RadioButtonUncheckedIcon data-testid="unchecked-radio-two" className="unchecked-radio" sx={{ fontSize: '1.7rem', color: theme.palette.grey[500] }} />
                            </>
                        )}
                    </Box>
                </IconButton>

                <ListItemText
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'grey' : 'inherit',
                    }}
                >
                    {task.name}
                </ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};
