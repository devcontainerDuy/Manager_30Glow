import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthenContext from "@/contexts/AuthenContext";

function NotFound() {
  const { user } = useAuthenContext();
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404</h1>
          <h2>Trang không tồn tại</h2>
          <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
          <Button as={Link} to={user ? "/danh-sach-lich" : "/"} variant="primary">
            Quay lại trang chủ
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
