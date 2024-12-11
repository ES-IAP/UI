import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome";
import TodoList from "./pages/ToDo/todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/todolist" element={<TodoList />} />
    </Routes>
  );
}

export default App;
