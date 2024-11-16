import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Paper,
    Select,
    MenuItem,
    Box
} from "@mui/material";
import { CheckCircle, Delete, Edit } from "@mui/icons-material";
import { updateTask } from "../../services/taskService";

// Update the options according to your backend enum values
const priorityOptions = ["low", "medium", "high"];
const statusOptions = ["to-do", "in progress", "done"];

function TaskTable({ tasks, setTasks, handleDelete, handleEdit, setPriority, setStatus }) {

    async function handleToggleStatus(taskId) {
        try {
            const updatedTask = await updateTask(taskId, { status: "done" });
            const updatedTasks = tasks.map((task) =>
                task.id === taskId ? { ...task, status: updatedTask.status } : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    }
       

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                backgroundColor: 'white'
            }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f7ff' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>Task</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>Deadline</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>Priority</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow
                            key={task.id || index}
                            sx={{ '&:hover': { backgroundColor: '#f8f9ff' } }}
                        >
                            <TableCell>
                                <Box sx={{ maxWidth: 300 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 500,
                                            color: '#2d2d2d',
                                            mb: 0.5
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                    {task.description && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#666',
                                                fontSize: '0.875rem',
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {task.description}
                                        </Typography>
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: task.deadline ? '#d32f2f' : '#666', // Set to red if there's a deadline
                                        fontWeight: 500
                                    }}
                                >
                                    {task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    }) : "No deadline"}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Select
                                    value={task.priority}
                                    onChange={(e) => setPriority(index, e.target.value)}
                                    size="small"
                                    sx={{
                                        minWidth: 120,
                                        '& .MuiSelect-select': {
                                            py: 1,
                                            backgroundColor: task.priority === 'high'
                                                ? '#fff1f0'
                                                : task.priority === 'medium'
                                                    ? '#fff7e6'
                                                    : '#f6ffed',
                                            color: task.priority === 'high'
                                                ? '#cf1322'
                                                : task.priority === 'medium'
                                                    ? '#d46b08'
                                                    : '#389e0d'
                                        }
                                    }}
                                >
                                    {priorityOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={task.status}
                                    onChange={(e) => setStatus(index, e.target.value)}
                                    size="small"
                                    sx={{
                                        minWidth: 130,
                                        '& .MuiSelect-select': {
                                            py: 1,
                                            backgroundColor: task.status === 'done'
                                                ? '#f6ffed'
                                                : task.status === 'in progress'
                                                    ? '#e6f7ff'
                                                    : '#f9f0ff',
                                        }
                                    }}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.replace(/-/g, " ")}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        onClick={() => handleToggleStatus(task.id)}
                                        sx={{
                                            color: task.status === 'done' ? '#52c41a' : '#d9d9d9',
                                            '&:hover': { color: '#52c41a' }
                                        }}
                                    >
                                        <CheckCircle />
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit(task)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(index)}
                                        sx={{
                                            color: '#ff4d4f',
                                            '&:hover': {
                                                color: '#cf1322',
                                                backgroundColor: '#fff1f0'
                                            }
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TaskTable;
