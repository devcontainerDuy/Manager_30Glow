import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuthenContext from "@/contexts/AuthenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Show() {
  const { id } = useParams();
  const { token, roles } = useAuthenContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [status, setStatus] = useState(0);
  const [userId, setUserId] = useState(null);
  const [note, setNote] = useState("");
  console.log("Data", roles);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 5 && note === "") {
      window.notyf.error("Vui lòng nhập ghi chú");
      return;
    }

    if (status === 1 && userId === null) {
      window.notyf.error("Vui lòng chọn nhân viên");
      return;
    }

    const payload = { status };

    if (status === 5 && note) {
      payload.note = note;
    }

    if (status === 1 && userId) {
      payload.id_user = userId;
    }

    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + "/bookings/" + id,
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.check === true) {
        window.notyf.success(res.data.message);
        setTimeout(() => {
          navigate("/danh-sach-lich/chi-tiet/" + id, { replace: true });
        }, 2000);
      } else {
        window.notyf.error(res.data.message);
      }
    } catch (err) {
      window.notyf.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/bookings/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.check === true) {
          setData(res.data.data);
          setStatus(res.data.data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/staff", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.data.check === true) {
          setStaff(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchUser();
  }, [id, token]);

  return (
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
                        <Card.Title className="text-primary">
                          Thông tin Booking
                        </Card.Title>

                        <Row className="mb-3">
                          {/* Ngày đặt */}
                          <Col md={6}>
                            <Row className="column-gap-1">
                              <Col xs={14}>
                                <Form.Group className="mb-3" controlId="status">
                                  <Form.Label>Trạng thái</Form.Label>
                                  <Form.Select
                                    value={status}
                                    onChange={(e) =>
                                      setStatus(Number(e.target.value))
                                    }
                                  >
                                    <option value={0}>
                                      Chưa xếp nhân viên
                                    </option>
                                    <option value={1}>Đã xếp nhân viên</option>
                                    <option value={2}>Đang thực hiện</option>
                                    <option value={3}>Đã xong</option>
                                    <option value={4}>Đã thanh toán</option>
                                    <option value={5}>Lịch đã hủy</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>
                          {/* Giờ đặt */}
                          <Col md={6}>
                            <Form.Group controlId="bookingTime">
                              <Form.Label>Giờ đặt</Form.Label>
                              <Form.Control
                                type="text"
                                value={
                                  data.time ? formatDateTime(data.time) : ""
                                }
                                readOnly
                                disabled
                              />
                            </Form.Group>
                          </Col>

                          <Col xs={12}>
                            <Form.Group className="mb-3" controlId="note">
                              <Form.Label>Ghi chú</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập ghi chú..."
                                value={data.note}
                                disabled={
                                  data.status !== 5 && status === 5
                                    ? false
                                    : true
                                }
                                onChange={(e) => setNote(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card>
                      <Card.Body>
                        <Card.Title className="text-primary">
                          Danh sách Dịch vụ
                        </Card.Title>
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
                                    {item.name}{" "}
                                    <span className="text-danger">
                                      {item.price
                                        ? `(${item.discount.toLocaleString()}%)`
                                        : ""}
                                    </span>
                                  </td>
                                  <td>{item.price.toLocaleString()} VND</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3">
                                  Không có dịch vụ nào được chọn.
                                </td>
                              </tr>
                            )}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan="2">Tổng cộng</th>
                              <th>
                                {data.service
                                  ?.reduce(
                                    (total, item) =>
                                      total + item.price || item.compare_price,
                                    0
                                  )
                                  .toLocaleString()}{" "}
                                VND
                              </th>
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
                        <Card.Title className="text-primary">
                          Thông tin Khách hàng
                        </Card.Title>
                        <p>
                          <strong>Tên:</strong> {data.customer?.name}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          <a href={`mailto:${data.customer?.email}`}>
                            {data.customer?.email}
                          </a>
                        </p>
                        <p>
                          <strong>Số điện thoại:</strong>{" "}
                          {data.customer?.phone || "Không có"}
                        </p>
                        <p>
                          <strong>Địa chỉ:</strong>{" "}
                          {data.customer?.address || "Không có"}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card>
                      <Card.Body>
                        {status !== 0 && data.user !== null ? (
                          <>
                            <Card.Title className="text-primary">
                              Thông tin Nhân viên
                            </Card.Title>
                            <p>
                              <strong>Tên:</strong> {data.user?.name}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              <a href={`mailto:${data.user?.email}`}>
                                {data.user?.email}
                              </a>
                            </p>
                            <p>
                              <strong>Số điện thoại:</strong>{" "}
                              {data.user?.phone || "Không có"}
                            </p>
                            <p>
                              <strong>Địa chi:</strong>{" "}
                              {data.user?.address || "Không có"}
                            </p>
                          </>
                        ) : (
                          <>
                            <Card.Title className="text-primary">
                              Chọn nhân viên
                            </Card.Title>
                            <Form.Group className="mt-3" controlId="user_id">
                              <Form.Select
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                              >
                                <option value="">Chọn nhân viên</option>
                                {staff.length > 0 ? (
                                  staff.map((item) => (
                                    <option key={item.id} value={item.uid}>
                                      {item.name}
                                    </option>
                                  ))
                                ) : (
                                  <option value="">
                                    Không có nhân viên nào
                                  </option>
                                )}
                              </Form.Select>
                            </Form.Group>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex justify-content-end my-auto">
                <div className="m-2 ">
                  <Button
                    placeholder="Lưu lại"
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {" "}
                    <span>Lưu lại </span>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        {/* End DataGrid */}
      </Row>
    </Container>
  );
}

export default Show;
