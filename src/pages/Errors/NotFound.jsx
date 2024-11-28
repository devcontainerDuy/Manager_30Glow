import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404</h1>
          <h2>Trang không tồn tại</h2>
          <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
          <Button as={Link} to="/dang-nhap" variant="primary">
            Quay lại trang chủ
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
