import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Import your Auth context
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import Loader from './Loader'; // Import the Loader component

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loader
  const { resetPassword } = useAuth(); // Use the resetPassword function from Firebase

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); // Show loader when the form is submitted

    try {
      await resetPassword(email); // Send password reset email
      setMessage('Please check your email for password reset instructions.');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false); // Hide loader after action completes
    }
  };

  return (
    <div className="position-relative">
      {/* Show loader overlay when loading */}
      {loading && <Loader />}

      <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="justify-content-center w-100">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="card-title text-center">Reset Password</h3>

                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Reset Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
