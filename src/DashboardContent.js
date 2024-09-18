import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaBoxes, FaBuilding } from 'react-icons/fa'; // Import icons
import DashboardCard from './DashboardCard'; // Import reusable DashboardCard component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useUsersCount from './useUsersCount'; // Custom hook to fetch user counter
import useSitesCount from './useSitesCount'; // Custom hook to fetch sites counter
import useProductsCount from './useProductsCount';
function DashboardContent() {
  const navigate = useNavigate(); // Hook for navigation
  const { counter: userCounter, loading: loadingUsers } = useUsersCount(); // Fetch user counter
  const { counter: sitesCounter, loading: loadingSites } = useSitesCount(); // Fetch sites counter
  const { counter: productsCounter, loading: loadingProducts } = useProductsCount(); // Fetch sites counter
  return (
    <Container fluid>
      <h2 className="my-4 text-center">Admin Dashboard</h2>

      {/* Summary Metrics Row */}
      <Row className="mb-4">
        <Col md={3}>
          <DashboardCard
            title="Total Users"
            count={loadingUsers ? 'Loading...' : userCounter} // Display loading text or user counter
            icon={FaUsers}
            buttonText="Manage Users"
            buttonVariant="primary"
            onClick={() => navigate('/users')} // Navigate to Users section
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            title="Total Products"
            count={loadingProducts ? 'Loading...' : productsCounter} // Display loading text or sites counter
            icon={FaBoxes}
            buttonText="Manage Stock"
            buttonVariant="success"
            onClick={() => navigate('/products')} // Navigate to Stock section
          />
        </Col>
        <Col md={3}>
          <DashboardCard
            title="Total Sites"
            count={loadingSites ? 'Loading...' : sitesCounter} // Display loading text or sites counter
            icon={FaBuilding}
            buttonText="View Sites"
            buttonVariant="warning"
            onClick={() => navigate('/sites')} // Navigate to Sites section
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardContent;
