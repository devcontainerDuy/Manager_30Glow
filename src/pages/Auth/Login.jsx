import { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "./Login.css";
import useAuthenContext from "@/contexts/AuthenContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberToken, setRememberToken] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthenContext();

  // Tải email đã ghi nhớ (nếu có)
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberToken(true); // Bật checkbox nếu đã ghi nhớ
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Lưu hoặc xóa email trong localStorage dựa trên trạng thái ghi nhớ
    if (rememberToken) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    login({ email, password, remember_token: rememberToken });
    setLoading(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img
            src="assets/images/logo30GLOW.png"
            alt="Logo"
            className="logo-container"
            style={{ maxWidth: "100%", height: "auto" }}
            width={72}
            height={72}
          />
          <h2 className="h3 mb-3 font-weight-normal" style={{ color: "blue" }}>
            HỆ THỐNG QUẢN LÝ
          </h2>
          <p>Vui lòng đăng nhập vào tài khoản của bạn!</p>
        </div>
        <div className="form-label-group mb-3">
          <label htmlFor="inputEmail">Tài khoản</label>
          <Form.Control
            type="email"
            placeholder="Nhập tên đăng nhập"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-label-group mb-3">
          <label htmlFor="inputPassword">Mật khẩu</label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-icon"
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className="checkbox mb-3">
          <Form.Check
            type="checkbox"
            label="Ghi nhớ đăng nhập"
            checked={rememberToken}
            onChange={(e) => setRememberToken(e.target.checked)}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          className="btn btn-lg btn-primary btn-block w-100"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        <p className="mt-5 mb-3 text-muted text-center">© 2024, Developed by 30GLOW</p>
      </form>
    </Container>
  );
};

export default Login;
