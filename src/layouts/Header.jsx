import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";
import Swal from "sweetalert2";

function Header() {
  const { logout, user } = useAuthenContext();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất tài khoản?",
      text: "Bạn có chắc muốn đăng xóa tài khoản này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar-custom" bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/danh-sach-lich">
            <img src="http://localhost:5173/src/assets/images/logo30GLOW.png" alt="Logo" className="navbar-logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto text-uppercase fw-semibold gap-3" variant="underline">
              <Nav.Link as={Link} to="/danh-sach-lich" active={isActive("/danh-sach-lich")}>
                Danh sách lịch
              </Nav.Link>
              {user?.roles?.includes("Manager") && (
                <>
                  <Nav.Link as={Link} to="/thong-ke" active={isActive("/thong-ke")}>
                    Thống kê
                  </Nav.Link>
                  <Nav.Link as={Link} to="/hoa-don" active={isActive("/hoa-don")}>
                    Hóa đơn
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Dropdown align="end">
              <Dropdown.Toggle id="dropdown-basic" className="p-0 border-0 bg-transparent" style={{ boxShadow: "none", background: "none" }}>
                <span className="navbar-text">
                  Xin chào: <strong>{user?.name}</strong>
                </span>
                <img
                  src="https://preview.redd.it/thoughts-on-foden-v0-mfm3d8apqdoc1.jpeg?auto=webp&s=d1787f3de4f4f1f1f99db6f349713bc66cc53a40"
                  alt="Avatar"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
