import React, { useState } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberToken, setRememberToken] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const notyf = new Notyf({
        duration: 1000,
        position: { x: 'right', y: 'top' },
        types: [
            {
                type: 'warning',
                background: 'orange',
                icon: { className: 'material-icons', tagName: 'i', text: 'warning' },
            },
            {
                type: 'error',
                background: 'indianred',
                duration: 2000,
                dismissible: true,
            },
        ],
    });

    const loginUser = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/login-manager`,
                {
                    email,
                    password,
                    remember_token: rememberToken,
                }
            );

            if (response.data.check) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('uid', response.data.uid);
                localStorage.setItem('expiry', response.data.expiry);

                notyf.open({
                    type: 'success',
                    message: 'Đăng nhập thành công!',
                });

                setTimeout(() => {
                    if (response.data.role === 'manager') {
                        navigate('/manager');
                    } else if (response.data.role === 'staff') {
                        navigate('/statistical');
                    } else {
                        notyf.open({
                            type: 'error',
                            message: 'Vai trò không hợp lệ',
                        });
                    }
                }, 1000);
            } else {
                notyf.open({
                    type: 'error',
                    message: 'Sai tài khoản hoặc mật khẩu',
                });
            }
        } catch (error) {
            notyf.open({
                type: 'error',
                message: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
            });
        }
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