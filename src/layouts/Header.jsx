import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div>
        <Link to="/" className="navbar-brand">
          My App
        </Link>
      </div>
      <nav className="d-flex">
        <Link to="/" className="nav-link">
          Trang chủ
        </Link>
        <Link to="/gioi-thieu" className="nav-link">
          Giới thiệu
        </Link>
        <Link to="/lien-he" className="nav-link">
          Liên hệ
        </Link>
      </nav>
    </header>
  );
}

export default Header;
