import React from 'react';
import { FaUser } from 'react-icons/fa'; // Import a user icon

function Profile() {
  // Dummy user profile data, you can replace it with actual data fetching logic
  const userProfile = {
    name: 'Admin Name',
    email: 'admin@example.com',
    role: 'Administrator',
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <div className="card-body text-center">
              <h4 className="card-title mb-4">
                <FaUser className="me-2" /> Profile
              </h4>
              <hr />
              <div className="row text-start">
                <div className="col-md-6 mb-3">
                  <strong>Name:</strong> <span className="text-muted ms-2">{userProfile.name}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Email:</strong> <span className="text-muted ms-2">{userProfile.email}</span>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Role:</strong> <span className="text-muted ms-2">{userProfile.role}</span>
                </div>
              </div>
              <button className="btn btn-primary mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
