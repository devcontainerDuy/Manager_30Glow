import React, { useState } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberToken, setRememberToken] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login-manager`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    remember_token: rememberToken,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                

                if (data.check) {
                    localStorage.setItem('remember_token', data.token);
                    localStorage.setItem('check', data.check); 
                    showNotification('Đăng nhập thành công!', 'success');
                    setTimeout(() => {
                        navigate('/manager'); 
                    }, 1000);
                } else {
                    showNotification('Sai tài khoản hoặc mật khẩu', 'danger');
                }
            } else {
                showNotification('Sai tài khoản hoặc mật khẩu', 'danger');
            }
        } catch (error) {
            showNotification('Đã xảy ra lỗi, vui lòng thử lại sau.', 'danger');
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                    <h2 className="mb-4 text-center" style={{ color: 'blue' }}>HỆ THỐNG QUẢN LÝ</h2>
                    <p className="mb-4 text-center">Vui lòng đăng nhập vào tài khoản của bạn!</p>

                    {notification.message && (
                        <Alert variant={notification.type} className="text-center">
                            {notification.message}
                        </Alert>
                    )}

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

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Ghi nhớ đăng nhập"
                                checked={rememberToken}
                                onChange={(e) => setRememberToken(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">Đăng nhập</Button>
                    </Form>
                    <p className="mt-4 text-center">© 2024, Developed by 30GLOW</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;