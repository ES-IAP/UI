import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './pages/todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
