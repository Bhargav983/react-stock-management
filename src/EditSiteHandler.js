import React, { useState } from 'react';
import axios from 'axios';

export default function EditSiteHandler({ initialData, onEditSuccess, onClose }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Update the site in Firebase Realtime Database
      await axios.put(`https://test1-52d71-default-rtdb.firebaseio.com/sites/${formData.id}.json`, formData);
      onEditSuccess(); // Notify parent of success
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error updating site:', err);
      setError('Failed to update site. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Manager</label>
        <input
          type="text"
          name="manager"
          className="form-control"
          value={formData.manager}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mobile</label>
        <input
          type="text"
          name="mobile"
          className="form-control"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
