import React from 'react';
import { Card } from 'react-bootstrap';

function ChartCard({ title, children }) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h4 className="card-title">{title}</h4>
        {children}
      </Card.Body>
    </Card>
  );
}

export default ChartCard;
