import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "./Login.css";
import { loginAuth } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { login } from "../../stores/actions/authAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberToken, setRememberToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const notyf = new Notyf();

  const loginUser = async () => {
    // setLoading(true);
    try {
      const response = await loginAuth({ email, password, rememberToken });

      if (response.check) {
        dispath(login(response));
        
        if (response.role === "manager") {
          navigate("/manager");
          notyf.success("Đăng nhập thành công!");
        } else if (response.role === "staff") {
          navigate("/staff");
          notyf.success("Đăng nhập thành công!");
        }
        else notyf.error("Vai trò không hợp lệ.");
      } else {
        notyf.error("Sai tài khoản hoặc mật khẩu.");
      }
    } catch (error) {
      if (error.response) {
        error.response.status === 429
          ? notyf.error("Quá nhiều yêu cầu. Vui lòng thử lại sau.")
          : notyf.error(
              "Lỗi từ server: " + error.response.data.message ||
                "Không xác định"
            );
      } else {
        notyf.error(
          error.request
            ? "Không nhận được phản hồi từ server."
            : `Đã xảy ra lỗi: ${error.message}`
        );
      }
    }
    // } finally {
    //     setLoading(false);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    // <Container fluid className="d-flex align-items-center justify-content-center vh-100">
    //     <Row className="justify-content-center w-100">
    //         <Col md={3}>
    //             <div className="d-flex justify-content-center mt-3">
    //                 <img
    //                     src="/src/assets/images/logo30GLOW.png"
    //                     alt="Logo"
    //                     className="logo-container"
    //                     style={{ maxWidth: '100%', height: 'auto' }}
    //                 />
    //             </div>
    //             <h2 className="mb-4 text-center" style={{ color: 'blue' }}>HỆ THỐNG QUẢN LÝ</h2>
    //             <p className="mb-4 text-center">Vui lòng đăng nhập vào tài khoản của bạn!</p>
    //             <Form onSubmit={handleSubmit}>
    //                 <Form.Group className="mb-3">
    //                     <Form.Label>Tài khoản</Form.Label>
    //                     <Form.Control
    //                         type="email"
    //                         placeholder="Nhập tên đăng nhập"
    //                         value={email}
    //                         onChange={e => setEmail(e.target.value)}
    //                         required
    //                     />
    //                 </Form.Group>
    //                 <Form.Group className="mb-3">
    //                     <Form.Label>Mật khẩu</Form.Label>
    //                     <div className="position-relative">
    //                         <Form.Control
    //                             type={showPassword ? 'text' : 'password'}
    //                             placeholder="Nhập mật khẩu"
    //                             value={password}
    //                             onChange={e => setPassword(e.target.value)}
    //                             required
    //                         />
    //                         <FontAwesomeIcon
    //                             icon={showPassword ? faEyeSlash : faEye}
    //                             className="password-icon"
    //                             onClick={togglePasswordVisibility}
    //                         />
    //                     </div>
    //                 </Form.Group>
    //                 <Form.Group className="mb-3">
    //                     <Form.Check
    //                         type="checkbox"
    //                         label="Ghi nhớ đăng nhập"
    //                         checked={rememberToken}
    //                         onChange={e => setRememberToken(e.target.checked)}
    //                     />
    //                 </Form.Group>
    //                 <Button variant="primary" type="submit" className="w-100" disabled={loading}>
    //                     {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
    //                 </Button>
    //             </Form>
    //             <p className="mt-4 text-center">© 2024, Developed by 30GLOW</p>
    //         </Col>
    //     </Row>
    // </Container>
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <form className="form-signin" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img
            src="/src/assets/images/logo30GLOW.png"
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
        <p className="mt-5 mb-3 text-muted text-center">
          © 2024, Developed by 30GLOW
        </p>
      </form>
    </Container>
  );
};

export default Login;
