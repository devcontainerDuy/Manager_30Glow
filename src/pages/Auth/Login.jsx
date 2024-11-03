import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const mockData = {
    email: 'tam@gmail.com',
    password: 'tam1234',
    role: 'manager',
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === mockData.email && password === mockData.password) {
            alert('Đăng nhập thành công!');
            localStorage.setItem('role', mockData.role);
            localStorage.setItem('token', 'mockToken123'); // Simulate a token
            setTimeout(() => {
                navigate('/manager'); 
            }, 100);
        } else {
            alert('Sai mật khẩu');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row className="justify-content-center w-100">
                <Col md={3}>
                    <div className="d-flex justify-content-center mt-3">
                        <img
                            src="/src/assets/images/logo30GLOW.png"
                            alt="Logo"
                            className="logo-container"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                    <h2 className="mb-4 text-center" style={{ color: 'blue' }}>
                        HỆ THỐNG QUẢN LÝ
                    </h2>
                    <p className='mb-4 text-center'>Vui lòng đăng nhập vào tài khoản của bạn!</p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập tên đăng nhập"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="mb-3">
                            <label htmlFor="password">Mật khẩu:</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">Login</Button>
                    </Form>
                    <p className="mb-4 text-center">© 2024, Developed by 30GLOW</p>
                </Col>
                
            </Row>
        </Container>
    );
}

export default Login;