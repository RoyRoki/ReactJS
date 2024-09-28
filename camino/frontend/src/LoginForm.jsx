// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [header, setHeader] = useState("Not Login yet");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            },
              {
                headers: {
                     'Content-Type': 'application/json',
                         },
                withCredentials: true, // This allows the browser to send and receive cookies
             });

            const { accessToken, refreshToken } = response.data; // Destructure AuthResponseDTO

            // Store tokens (you can use cookies, local storage, etc.)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            setSuccess('Login successful!');
            setHeader(`Current User => ${username}`)
            setError('');
        } catch (err) {
            // Handle errors (like invalid credentials)
            setError(err.response?.data?.message || 'An error occurred during login');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>{header}</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default LoginForm;
