import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  ListItemSecondaryAction,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { fetchTasks, createTask } from "../services/TaskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  const handleChange = (e) => setInput(e.target.value);

  const addTask = async () => {
    if (input.trim() !== "") {
      const newTask = { text: input, isCompleted: false };
      const createdTask = await createTask(newTask);
      if (createdTask) {
        setTasks([...tasks, createdTask]);
        setInput("");
      }
    }
  };

  const toggleCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = await createTask({
      ...task,
      isCompleted: !task.isCompleted,
    });
    const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
    setTasks(newTasks);
  };

  const handleDelete = async (index) => {
    console.log("Delete task at index", index);
    // const task = tasks[index];
    // await deleteTask(task.id);
    // setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          My Tasks
        </Typography>
        <TextField
          label="Add a new task"
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={addTask}>
          Add Task
        </Button>
      </Paper>

      <List sx={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <ListItem key={task.id} disableGutters divider>
            <Checkbox
              checked={task.isCompleted}
              onChange={() => toggleCompletion(index)}
            />
            <ListItemText
              primary={task.text}
              style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(index)}>
                <Delete color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
