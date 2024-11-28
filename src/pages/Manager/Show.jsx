import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "@/layouts/Header";
import axios from "axios";
import useAuthenContext from "@/contexts/AuthenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Show() {
  const { id } = useParams();
  const { token } = useAuthenContext();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  console.log("Data", data);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/bookings/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.data.check === true) {
          setData(res.data.data);
          setStatus(res.data.data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs="12">
            <div className="text-start">
              <h4>Chi tiết dịch vụ đặt</h4>
            </div>
            <Form encType="multipart/form-data">
              <Row className="row-gap-3">
                {/* Thông tin Booking */}
                <Col xs={12} md={8}>
                  <Row className="row-gap-3">
                    <Col xs={12}>
                      <Card>
                        <Card.Body>
                          <Card.Title className="text-primary">Thông tin Booking</Card.Title>
                          <Form.Group className="mb-3" controlId="note">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Nhập ghi chú..." value={data.note} disabled />
                          </Form.Group>

                          <Row className="mb-3">
                            {/* Ngày đặt */}
                            <Col md={6}>
                              <Row className="row-gap-3">
                                <Col xs={8}>
                                  <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                                      <option value={0}>Chưa xếp nhân viên</option>
                                      <option value={1}>Đã xếp nhân viên</option>
                                      <option value={2}>Đang thực hiện</option>
                                      <option value={3}>Đã xong</option>
                                      <option value={4}>Đã thanh toán</option>
                                      <option value={5}>Lịch đã hủy</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col className="text-start my-auto">
                                  <div className="pt-2">
                                    <Button variant="primary" type="submit">
                                      <FontAwesomeIcon icon={faFloppyDisk} />
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            {/* Giờ đặt */}
                            <Col md={6}>
                              <Form.Group controlId="bookingTime">
                                <Form.Label>Giờ đặt</Form.Label>
                                <Form.Control type="text" value={data.time ? formatDateTime(data.time) : ""} readOnly disabled />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={12}>
                      <Card>
                        <Card.Body>
                          <Card.Title className="text-primary">Danh sách Dịch vụ</Card.Title>
                          <Table striped bordered hover responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Tên Dịch vụ</th>
                                <th>Giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.service && data.service.length > 0 ? (
                                data.service.map((item, index) => (
                                  <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {item.name} <span className="text-danger">{item.price ? `(${item.discount.toLocaleString()}%)` : ""}</span>
                                    </td>
                                    <td>{item.price.toLocaleString()} VND</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3">Không có dịch vụ nào được chọn.</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th colSpan="2">Tổng cộng</th>
                                <th>{data.service?.reduce((total, item) => total + item.price || item.compare_price, 0).toLocaleString()} VND</th>
                              </tr>
                            </tfoot>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                {/* Thông tin Khách hàng & nhân viên */}
                <Col xs={12} md={4}>
                  <Row className="row-gap-3">
                    <Col xs={12}>
                      <Card>
                        <Card.Body>
                          <Card.Title className="text-primary">Thông tin Khách hàng</Card.Title>
                          <p>
                            <strong>Tên:</strong> {data.customer?.name}
                          </p>
                          <p>
                            <strong>Email:</strong> <a href={`mailto:${data.customer?.email}`}>{data.customer?.email}</a>
                          </p>
                          <p>
                            <strong>Số điện thoại:</strong> {data.customer?.phone || "Không có"}
                          </p>
                          <p>
                            <strong>Địa chỉ:</strong> {data.customer?.address || "Không có"}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    {status !== 0 && (
                      <Col xs={12}>
                        <Card>
                          <Card.Body>
                            <Card.Title className="text-primary">Thông tin Nhân viên</Card.Title>
                            <p>
                              <strong>Tên:</strong> {data.staff?.name}
                            </p>
                            <p>
                              <strong>Email:</strong> <a href={`mailto:${data.staff?.email}`}>{data.staff?.email}</a>
                            </p>
                            <p>
                              <strong>Số điện thoại:</strong> {data.staff?.phone || "Không có"}
                            </p>
                            <p>
                              <strong>Địa chi:</strong> {data.staff?.address || "Không có"}
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
          {/* End DataGrid */}
        </Row>
      </Container>
    </>
  );
}

export default Show;
