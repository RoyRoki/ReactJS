import axios from 'axios';
import React, { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true); // Start loading
    setError(null);   // Reset any previous errors

    try {
      // Make the API request to get users
      const token = localStorage.getItem('accessToken');
      console.log(token);
      const response = await axios.get('http://localhost:8080/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send JWT token from local storage
          'Content-Type': 'application/json',
        },
      });
      console.log(response)

      if (!response.status) {
        // If response is not OK (e.g., 401, 403, 500), throw an error
        throw new Error('Failed to fetch users');
      }

      // Parse the JSON data from the response
      const data = await response.data;
      setUsers(data); // Update the users state with the fetched data
    } catch (err) {
      setError(err.message); // Catch and set any error messages
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {/* Button to trigger fetching of users */}
      <button onClick={fetchUsers}>Fetch Users</button>

      {/* Display loading state */}
      {loading && <div>Loading...</div>}

      {/* Display error if there's any */}
      {error && <div>Error: {error}</div>}

      {/* Display the users if they exist */}
      {users.length > 0 && (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <h2>Username: {user.username}</h2>
              <h3>Email Id: {user.email}</h3>
                
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
