import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap'; // Import React Bootstrap ListGroup component
import { FaHome, FaUsers, FaBoxes, FaBuilding, FaChartBar, FaProductHunt, FaShoppingCart } from 'react-icons/fa'; // Import icons
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // To track the current route and set active link

  return (
    <div className="col-3 bg-light border-right p-0 vh-100 sidebar-custom" style={{ width: '10%' }}>
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <FaHome className="me-2" /> Dashboard
        </ListGroup.Item>
        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/users' ? 'active' : ''}`}
          onClick={() => navigate('/users')}
        >
          <FaUsers className="me-2" /> Users
        </ListGroup.Item>
        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/stock' ? 'active' : ''}`}
          onClick={() => navigate('/stock')}
        >
          <FaBoxes className="me-2" /> Stock
        </ListGroup.Item>
        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/sites' ? 'active' : ''}`}
          onClick={() => navigate('/sites')}
        >
          <FaBuilding className="me-2" /> Sites
        </ListGroup.Item>
        

        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/products' ? 'active' : ''}`}
          onClick={() => navigate('/products')}
        >
          <FaProductHunt className="me-2" /> Products
        </ListGroup.Item>
        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/purchase' ? 'active' : ''}`}
          onClick={() => navigate('/purchase')}
        >
          <FaShoppingCart className="me-2" /> Purchase
        </ListGroup.Item>

        <ListGroup.Item
          action
          className={`d-flex align-items-center ${location.pathname === '/reports' ? 'active' : ''}`}
          onClick={() => navigate('/reports')}
        >
          <FaChartBar className="me-2" /> Reports
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
