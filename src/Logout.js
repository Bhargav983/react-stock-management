import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  // Handle logout logic here (e.g., clear tokens, etc.)
  const handleLogout = () => {
    // Perform any necessary logout actions
    // For example: clear authentication tokens, reset user context, etc.
    console.log('User logged out');
    // Redirect to login page or home
    navigate('/');
  };

  return (
    <div className="d-flex align-items-center" onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
      <FaSignOutAlt className="me-2" style={{ color: 'red' }} /> {/* Set red color for the icon */}
      <span>Logout</span> {/* Set red color for the text */}
    </div>
  );
}

export default Logout;
