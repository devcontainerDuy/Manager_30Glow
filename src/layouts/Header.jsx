import { Link } from "react-router-dom";
import "./Header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";

function Header() {
  const { logout, user } = useAuthenContext();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary navbar-custom"
    >
      <Container>
        <Navbar.Brand as={Link} to="/danh-sach-lich">
          <img
            src="http://localhost:5173/src/assets/images/logo30GLOW.png"
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/danh-sach-lich">
              Trang Chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/statistical">
              Thống kê
            </Nav.Link>
            <Nav.Link as={Link} to="/bill">
              Hóa đơn
            </Nav.Link>
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Đăng xuất
            </Nav.Link>
          </Nav>
          <Nav>
            <div className="navbar-end d-flex align-items-center">
              <span className="navbar-text">
                Xin chào: <strong>{user.name}</strong>
              </span>
              <img
                src="https://preview.redd.it/thoughts-on-foden-v0-mfm3d8apqdoc1.jpeg?auto=webp&s=d1787f3de4f4f1f1f99db6f349713bc66cc53a40"
                alt="Avatar"
                className="avatar"
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
