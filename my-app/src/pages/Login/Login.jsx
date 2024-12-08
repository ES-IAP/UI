// pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            await login();
            // navigate("/welcome");
        } catch (error) {
            setError("Failed to login. Please try again.");
        }
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
                    Welcome to Our App
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#666',
                    marginBottom: '2rem'
                }}>
                    We're glad you're here!
                </p>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '0.75rem 2rem',
                        fontSize: '1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}
                >
                    Login
                </button>
            </main>
        </div>
    );
}

export default Login;