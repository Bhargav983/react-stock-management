import React from 'react';
import './Loader.css'; // Import the CSS for the loader

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
