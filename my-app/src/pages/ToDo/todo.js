// pages/TodoList.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Toolbar, Box } from "@mui/material";
import { Add, Logout } from "@mui/icons-material"
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import TaskTable from "../../components/TaskTable/TaskTable";
import TaskModal from "../../components/TaskModal/TaskModal";
import { fetchTasks, createTask, deleteTask } from "../../services/taskService";
import { logout, getCurrentUser } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    // State for TaskModal fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("to-do");

    useEffect(() => {
        const initializeUser = async () => {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            }
        };
        initializeUser();
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setTasks([]);
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setDescription("");
        setPriority("medium");
        setDeadline("");
        setStatus("to-do");

    };

    const handleSetPriority = (index, newPriority) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, priority: newPriority } : task
        );
        setTasks(updatedTasks);
    };
    
    const handleSetStatus = (index, newStatus) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const handleAddTask = async () => {
        const newTask = {
            title,
            description,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            priority: priority.toLowerCase(), // Ensure lowercase for enum compatibility
            status: "to-do" // Assuming default status if not editable on the frontend
        };

        try {
            const createdTask = await createTask(newTask);
            if (createdTask) {
                setTasks([...tasks, createdTask]);
                handleClose();
                toast.success("Task added successfully!");
            }
        } catch (error) {
            console.error("Error creating task:", error.response?.data || error.message);
            toast.error("Failed to create task. Please check your inputs.");
        }
    };


    const handleDelete = async (index) => {
        const task = tasks[index];
        await deleteTask(task.id);
        setTasks(tasks.filter((_, i) => i !== index));
        toast.success("Task deleted successfully!");
    };

    return (
        <Container>
            <div className="min-h-screen bg-gray-50">
            <AppBarComponent user={user?.username} title="User To-Do List" handleLogout={handleLogout} />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: "#1a237e" }}>
                        My To-Do List
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleClickOpen}
                            startIcon={<Add />}
                            sx={{
                                mb: 4,
                                backgroundColor: "#4169E1",
                                '&:hover': {
                                    backgroundColor: "#1a237e",
                                },
                                py: 1.5,
                            }}
                        >
                            Add Task
                        </Button>
                    </Box>
                </Container>

            </div>
            <TaskModal
                open={open}
                handleClose={handleClose}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                priority={priority}
                setPriority={setPriority}
                deadline={deadline}
                setDeadline={setDeadline}
                handleAddTask={handleAddTask}
            />
            <div className="task-table">
                <TaskTable
                    tasks={tasks}
                    handleDelete={handleDelete}
                    setPriority={handleSetPriority}
                    setStatus={handleSetStatus}
                />
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Container>
    );
}

export default TodoList;
