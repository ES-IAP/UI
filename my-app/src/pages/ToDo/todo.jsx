// pages/TodoList.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Select, MenuItem, TextField } from "@mui/material";
import { Add } from "@mui/icons-material"
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import TaskTable from "../../components/TaskTable/TaskTable";
import TaskModal from "../../components/TaskModal/TaskModal";
import { fetchTasks, createTask, deleteTask, updateTask } from "../../services/taskService";
import { logout, getCurrentUser } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);  // Track task being edited


    // State for TaskModal fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("to-do");

    const [filterType, setFilterType] = useState(""); // Tracks filter type (category or status)
    const [filterValue, setFilterValue] = useState(""); // Tracks filter value
    const [filteredTasks, setFilteredTasks] = useState([]); // Tracks filtered tasks


    useEffect(() => {
        const initializeUser = async () => {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                const fetchedTasks = await fetchTasks();
                
                setTasks(fetchedTasks);
            } else {
                window.location.href = "/"; // Redirect to login if not logged in
            }
        };
        initializeUser();
    }, []);
    
    useEffect(() => {
        if (!filterType || !filterValue) {
            setFilteredTasks(tasks);
        } else {
            handleFilterChange();
        }
    }, [filterType, filterValue, tasks]); // Automatically update filtered tasks
    


    const handleLogout = async () => {
        await logout();
        setUser(null);
        setTasks([]);
        setFilteredTasks([]);
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

    const handleSetPriority = async (index, newPriority) => {
        const task = tasks[index];
        try {
            const updatedTask = await updateTask(task.id, { priority: newPriority });
            const updatedTasks = tasks.map((t) =>
                t.id === task.id ? { ...t, priority: updatedTask.priority } : t
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Failed to update task priority:", error);
        }
    };


    const handleSetStatus = async (index, newStatus) => {
        const task = tasks[index];
        try {
            const updatedTask = await updateTask(task.id, { status: newStatus });
            const updatedTasks = tasks.map((t) =>
                t.id === task.id ? { ...t, status: updatedTask.status } : t
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };

    const handleAddTask = async () => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        if (deadline && deadline < today) {
            toast.error("Deadline must be today or a future date.");
            return;
        }

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
        try {
            await deleteTask(task.id); // Call the API
            // If the API call is successful, update the UI and show success toast
            setTasks(tasks.filter((_, i) => i !== index));
            toast.success("Task deleted successfully!");
        } catch (error) {
            // If an error occurs, log it and show an error toast
            console.error("Error deleting task:", error.response?.data || error.message);
            toast.error("Failed to delete task. Please try again.");
        }
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);  // Set task to be edited
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setDeadline(task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : "");
        setOpen(true);
    };

    const handleSaveTask = async () => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

        if (deadline && deadline < today) {
            toast.error("Deadline must be today or a future date.");
            return;
        }

        const updates = {
            title,
            description,
            priority,
            deadline: deadline ? new Date(deadline).toISOString() : null,
        };

        try {
            const savedTask = await updateTask(taskToEdit.id, updates); // Pass only updated fields
            setTasks(tasks.map((task) => (task.id === savedTask.id ? savedTask : task)));
            setTaskToEdit(null);
            handleClose();
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task.");
        }
    };

    const handleFilterChange = () => {
        if (!filterType || !filterValue) {
            toast.error("Please select a filter type and value.");
            return;
        }

        let filtered = tasks;

        if (filterType === "priority") {
            filtered = tasks.filter((task) => task.priority === filterValue.toLowerCase());
        } else if (filterType === "status") {
            filtered = tasks.filter((task) => task.status === filterValue.toLowerCase());
        } else if (filterType === "deadline") {
            filtered = tasks.filter(
                (task) => task.deadline && new Date(task.deadline).toISOString().split("T")[0] === filterValue
            );
        }

        setFilteredTasks(filtered);
    };

    const handleClearFilters = () => {
        setFilterType("");
        setFilterValue("");
        setFilteredTasks(tasks); // Reset to all tasks
    };

    return (
        <Container>
            <div className="min-h-screen bg-gray-50">
                <AppBarComponent user={user?.username} title="User To-Do List" handleLogout={handleLogout} />
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: "#1a237e" }}>
                        My To-Do List
                    </Typography>

                    {/* Filter Section */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
                        <Select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            displayEmpty
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="" disabled>
                                Select Filter Type
                            </MenuItem>
                            <MenuItem value="priority">Priority</MenuItem>
                            <MenuItem value="status">Status</MenuItem>
                            <MenuItem value="deadline">Deadline</MenuItem>
                        </Select>

                        {filterType === "priority" && (
                            <Select
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                displayEmpty
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="" disabled>
                                    Select Priority
                                </MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </Select>
                        )}

                        {filterType === "status" && (
                            <Select
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                displayEmpty
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="" disabled>
                                    Select Status
                                </MenuItem>
                                <MenuItem value="to-do">To-Do</MenuItem>
                                <MenuItem value="in progress">In Progress</MenuItem>
                                <MenuItem value="done">Done</MenuItem>
                            </Select>
                        )}

                        {filterType === "deadline" && (
                            <TextField
                                type="date"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                sx={{ minWidth: 150 }}
                            />
                        )}
                        <Button variant="outlined" onClick={handleClearFilters} sx={{ py: 1.5 }}>
                            Clear Filters
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            startIcon={<Add />}
                            sx={{
                                backgroundColor: "#4169E1",
                                "&:hover": { backgroundColor: "#1a237e" },
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
                handleAddTask={taskToEdit ? handleSaveTask : handleAddTask}  // Switch between add and edit modes
            />
            <div className="task-table">
                <TaskTable
                    tasks={filteredTasks} // Pass filtered tasks here
                    setTasks={setTasks}
                    handleDelete={handleDelete}
                    setPriority={handleSetPriority}
                    setStatus={handleSetStatus}
                    handleEdit={handleEditTask}  // Pass edit handler
                />
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Container>
    );
}

export default TodoList;
