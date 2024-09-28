// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await axios.post('http://localhost:8080/signup', {
                username,
                email,
                password,
            });

            console.log(response.data.message);
            // Assuming the backend sends a success message
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            // Handle errors (like user already exists, etc.)
            setError(err.response?.data?.message || 'An error occurred during signup');
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignupForm;
