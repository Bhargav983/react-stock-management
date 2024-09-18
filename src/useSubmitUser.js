import { useState } from 'react';
import axios from 'axios'; // Import Axios

export default function useSubmitUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUser = async (formData, handleAddUser, handleClose) => {
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.post('https://test1-52d71-default-rtdb.firebaseio.com/users.json', formData);

      if (response.status === 200) {
        handleAddUser(formData); // Notify the parent to add user
        handleClose(); // Close the modal
      }
    } catch (error) {
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false); // Stop loading after the process completes
    }
  };

  return { submitUser, loading, error };
}
