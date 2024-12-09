import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthenContext from "@/contexts/AuthenContext";

function NotFound() {
  const { user } = useAuthenContext();
  const redirectPath =
    user && Array.isArray(user.roles)
      ? user.roles.includes("Manager")
        ? "/manager"
        : "/staff"
      : "/dang-nhap";

  return (
    <Container className="text-center">
      <h1>404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Button as={Link} to={redirectPath} variant="primary">
        Quay lại trang chủ
      </Button>
    </Container>
  );
}

export default NotFound;
