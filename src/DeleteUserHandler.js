import axios from 'axios';
import { useState } from 'react';

export default function DeleteUserHandler({ userId, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // Delete the user from Firebase Realtime Database
      await axios.delete(`https://test1-52d71-default-rtdb.firebaseio.com/users/${userId}.json`);
      
      // Step 1: Retrieve the current user counter
      const counterResponse = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/counters/usersCounter.json');
      let currentCounter = counterResponse.data || 0; // Get the current counter, default to 0 if not available

      // Step 2: Decrement the counter by 1
      const newCounter = Math.max(currentCounter - 1, 0); // Ensure the counter doesn't go below 0

      // Step 3: Update the counter in Firebase
      await axios.put('https://test1-52d71-default-rtdb.firebaseio.com/counters/usersCounter.json', newCounter);

      // Trigger the callback for successful deletion
      onDeleteSuccess();

    } catch (err) {
      console.error('Error deleting user or updating counter:', err);
      setError('Failed to delete user or update counter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-danger" onClick={handleDeleteUser} disabled={loading}>
        {loading ? 'Deleting...' : 'Confirm Delete'}
      </button>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
