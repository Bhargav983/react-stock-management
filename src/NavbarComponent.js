import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaSearch, FaUser } from 'react-icons/fa'; // User and Search icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Logout from './Logout'; // Import the new Logout component

function NavbarComponent() {
  const navigate = useNavigate(); // Use useNavigate for routing

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand href="#" className="text-uppercase fw-bold">
          Admin Name
        </Navbar.Brand>

        {/* Search Form */}
        <Form className="d-flex mx-auto" style={{ width: '30%', position: 'relative' }}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <FaSearch
            size={18}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888'
            }}
          />
        </Form>

        {/* Profile Dropdown */}
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
              <FaUserCircle size={24} className="me-2" />
              <span>Admin</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate('/profile')} // Use navigate to go to profile page
                className="d-flex align-items-center"
              >
                <FaUser className="me-2" /> Profile
              </Dropdown.Item>
              <Dropdown.Item as="div"> {/* Use the separate Logout component */}
                <Logout />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
