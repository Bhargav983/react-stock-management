import axios from 'axios';
import { useState } from 'react';

export default function DeleteSiteHandler({ siteId, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle site deletion
  const handleDeleteSite = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Delete the site from Firebase Realtime Database
      await axios.delete(`https://test1-52d71-default-rtdb.firebaseio.com/sites/${siteId}.json`);
      
      // Step 2: Retrieve the current site counter from Firebase
      const counterResponse = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/counters/sitesCounter.json');
      let currentCounter = counterResponse.data || 0; // Get the current counter, default to 0 if not available

      // Step 3: Decrement the counter by 1, ensuring it doesn't go below 0
      const newCounter = Math.max(currentCounter - 1, 0);

      // Step 4: Update the counter in Firebase
      await axios.put('https://test1-52d71-default-rtdb.firebaseio.com/counters/sitesCounter.json', newCounter);

      // Step 5: Trigger the callback to update the UI after deletion
      onDeleteSuccess();

    } catch (err) {
      console.error('Error deleting site or updating counter:', err);
      setError('Failed to delete site or update counter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-danger" onClick={handleDeleteSite} disabled={loading}>
        {loading ? 'Deleting...' : 'Confirm Delete'}
      </button>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
