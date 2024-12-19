import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthenContext from "@/contexts/AuthenContext";
import { useEffect, useState } from "react";

function NotFound() {
  const { user } = useAuthenContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </>
      ) : (
        <>
          <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Row>
              <Col className="text-center">
                <>
                  <h1>404</h1>
                  <h2>Trang không tồn tại</h2>
                  <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
                  <Button as={Link} to={user ? "/danh-sach-lich" : "/"} variant="primary">
                    Quay lại trang chủ
                  </Button>
                </>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default NotFound;
