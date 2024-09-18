import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import SignUpForm from './SignupForm';
import Loginform from './Loginform';
import Dashboard from './Dashboard';
import Users from './Users';
import Stock from './Stock';
import Sites from './Sites';
import Reports from './Reports';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import Products from './Products'
import SidebarLayout from './SidebarLayout'; // A layout that includes the Sidebar

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes (without sidebar) */}
          <Route path="/" element={<Loginform />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          {/* Private Routes (with sidebar) */}
          <Route element={<SidebarLayout />}> {/* This layout includes Sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/products" element={<Products />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} /> 
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
