import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import ChartCard from './ChartCard';

export default function Reports() {
  // Example data for the charts
  const userActivityData = [
    { name: 'Jan', users: 100 },
    { name: 'Feb', users: 200 },
    { name: 'Mar', users: 300 },
    { name: 'Apr', users: 150 },
    { name: 'May', users: 250 },
  ];

  const stockUsageData = [
    { name: 'Cement', used: 500 },
    { name: 'Bricks', used: 300 },
    { name: 'Paint', used: 200 },
    { name: 'Sand', used: 700 },
  ];

  const siteProgressData = [
    { name: 'Site A', progress: 75 },
    { name: 'Site B', progress: 50 },
    { name: 'Site C', progress: 90 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container">
      <h2 className="text-center my-4">Reports</h2>

      <Row className="mt-5">
        <Col md={4}>
          <ChartCard title="User Activity">
            <LineChartComponent data={userActivityData} />
          </ChartCard>
        </Col>
        <Col md={4}>
          <ChartCard title="Stock Usage">
            <BarChartComponent data={stockUsageData} />
          </ChartCard>
        </Col>
        <Col md={4}>
          <ChartCard title="Site Progress">
            <PieChartComponent data={siteProgressData} colors={COLORS} />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
