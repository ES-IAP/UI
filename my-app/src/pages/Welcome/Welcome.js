import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService"; // Adjust the import path as needed
import "./Welcome.css";

function Welcome() {
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user && user.username) {
        setUsername(user.username);
      }
    };
    fetchUser();
  }, []);

  const handleToDoList = () => {
    navigate("/todolist");
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0'
    }}>
      <main style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Welcome, {username}!
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#666',
          marginBottom: '2rem'
        }}>
          Ready to get organized?
        </p>
        <button 
          onClick={handleToDoList}
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          Go to To-Do List
        </button>
      </main>
    </div>
  );
}

export default Welcome;
