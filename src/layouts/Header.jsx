import { Link } from "react-router-dom";
import "./Header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
function Header() {
  const { logout, user, token } = useAuthenContext();

  console.log("token", token);

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
          </Nav>

          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="p-0 border-0 bg-transparent"
              style={{ boxShadow: "none", background: "none" }}
            >
              <span className="navbar-text">
                Xin chào: <strong>{user.name}</strong>
              </span>
              <img
                src="https://preview.redd.it/thoughts-on-foden-v0-mfm3d8apqdoc1.jpeg?auto=webp&s=d1787f3de4f4f1f1f99db6f349713bc66cc53a40"
                alt="Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Thông tin cá nhân</Dropdown.Item>
              <Dropdown.Item
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
