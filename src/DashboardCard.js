import React from 'react';
import { Card } from 'react-bootstrap';

function DashboardCard({ title, count, icon: Icon, buttonVariant, onClick }) {
  return (
    <Card className="shadow-sm" onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{title}</Card.Title>
          {Icon && <Icon size={30} className={`text-${buttonVariant}`} />} {/* Dynamically render the icon */}
        </div>
        <Card.Text className="display-4">{count}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
