import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API requests

export default function useFetchUsers() {
  const [users, setUsers] = useState([]); // State for storing users from Firebase
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch users from Firebase Realtime Database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/users.json');
      const fetchedUsers = response.data ? Object.entries(response.data).map(([id, user]) => ({ id, ...user })) : [];
      setUsers(fetchedUsers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users.');
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers }; // Return necessary data and functions
}
