import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the Auth context
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'; // React Bootstrap components
import '@fortawesome/fontawesome-free/css/all.min.css';  // FontAwesome for the eye icon

function Loginform() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password); // Use the context login function for authentication
      navigate('/dashboard'); // Navigate to the Dashboard after successful login
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="card-title text-center">Login</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="position-absolute"
                      style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                      onClick={togglePasswordVisibility}
                    >
                      <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                    </span>
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Submit
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Loginform;
