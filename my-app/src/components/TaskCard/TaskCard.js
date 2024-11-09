// components/TaskCard.js
import React from "react";
import {
    Paper,
    Typography,
    IconButton,
    Checkbox,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./TaskCard.css"; // Importing the CSS file

function TaskCard({
    task,
    index,
    toggleCompletion,
    handleDelete,
    setPriority,
    setStatus
}) {
    return (
        <Paper elevation={3} className="task-card"> {/* Use the task-card class */}
            <Checkbox
                checked={task.status === "Completed"}
                onChange={() => toggleCompletion(index)}
            />
            <Typography variant="h6" className="task-title"> {/* Use the task-title class */}
                {task.title}
            </Typography>
            <Typography className="task-info">{task.description}</Typography> {/* Use task-info */}
            <Typography className="task-info" variant="body2">Deadline: {task.deadline}</Typography> {/* Use task-info */}
            
            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                    value={task.priority}
                    onChange={(e) => setPriority(e.target.value)}
                    label="Priority"
                >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={task.status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>
            
            <IconButton edge="end" onClick={() => handleDelete(index)} sx={{ mt: 1 }}>
                <Delete color="secondary" />
            </IconButton>
        </Paper>
    );
}

export default TaskCard;
