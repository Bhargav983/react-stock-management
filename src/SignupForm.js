import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation (optional)
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQr86KKbbIPqeNE78-X-ODrNTnt6x7M80",
  authDomain: "test1-52d71.firebaseapp.com",
  databaseURL: "https://test1-52d71-default-rtdb.firebaseio.com",
  projectId: "test1-52d71",
  storageBucket: "test1-52d71.appspot.com",
  messagingSenderId: "451217300673",
  appId: "1:451217300673:web:5f7a881c132ce79738c840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully!");
      // Optionally redirect to a success page or dashboard
    } catch (error) {
      setErrorMessage(error.message); // Set error message for display
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;