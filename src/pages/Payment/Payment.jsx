import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const PaymentPage = ({ bookingData }) => {
  const handlePayment = () => {
    // Logic to handle the payment process
    alert("Thanh toán thành công!");
  };

  return (
    <Container className="mt-5">
      <h4 className="text-center mb-4">Thanh Toán</h4>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Chi tiết đơn hàng</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <h5>Thông tin khách hàng</h5>
              <p><strong>Tên:</strong> {bookingData.customer.name}</p>
              <p><strong>Số điện thoại:</strong> {bookingData.customer.phone}</p>
            </Col>
            <Col md={6}>
              <h5>Thông tin nhân viên</h5>
              <p><strong>Tên:</strong> {bookingData.user.name}</p>
            </Col>
          </Row>
          <h5>Dịch vụ đã chọn</h5>
          <ul className="list-unstyled">
            {bookingData.service.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.unit_price} VND
              </li>
            ))}
          </ul>
          <h5 className="mt-3">Tổng tiền: <strong>{bookingData.total} VND</strong></h5>
        </Card.Body>
      </Card>
      <div className="text-center">
        <Button variant="primary" onClick={handlePayment}>Xác nhận thanh toán</Button>
      </div>
    </Container>
  );
};

// Example usage with the provided data
const bookingData = {
  "uid": "HDSV7TSRd1734245943",
  "user": {
    "name": "Nguyễn Thành Tâm",
    "phone": null
  },
  "customer": {
    "name": "Trần Khánh Duy",
    "phone": "012345678"
  },
  "service": [
    {
      "name": "Uốn xoăn nhẹ và cắt kiểu Quiff",
      "slug": "uon-xoan-nhe-va-cat-kieu-quiff",
      "unit_price": "1080000.00"
    },
    {
      "name": "Cắt kiểu Mohican và dưỡng bóng",
      "slug": "cat-kieu-mohican-va-duong-bong",
      "unit_price": "630000.00"
    }
  ],
  "total": "1710000.00",
  "status": 0
};

// Export the component
export default function App() {
  return <PaymentPage bookingData={bookingData} />;
}