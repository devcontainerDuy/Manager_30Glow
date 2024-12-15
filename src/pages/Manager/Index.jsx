import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useAuthenContext from "@/contexts/AuthenContext";
import Paginated from "@/components/Paginated";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Index() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  const { logout, token } = useAuthenContext();
  const statusMap = {
    0: {
      text: "Đang chờ xếp nhân viên",
      class: "text-warning",
      icon: "bi bi-clock",
    },
    1: {
      text: "Đã xếp nhân viên",
      class: "text-primary",
      icon: "bi bi-person-fill-check",
    },
    2: {
      text: "Đang thực hiện",
      class: "text-info",
      icon: "bi bi-chat-right-dots-fill",
    },
    3: {
      text: "Thành công",
      class: "text-success",
      icon: "bi bi-check-circle-fill",
    },
    4: {
      text: "Đã thanh toán",
      class: "text-success",
      icon: "bi bi-clipboard2-check-fill",
    },
    5: { text: "Thất bại", class: "text-danger", icon: "bi bi-x-circle" },
    default: {
      text: "Chưa xác định",
      class: "text-muted",
      icon: "bi bi-question-circle",
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDetail = (id) => {
    navigate("/danh-sach-lich/chi-tiet/" + id);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/bookings?page=" + page,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.check === true) {
          setBookings(res.data.data.data);
          setTotalPage(res.data.data.last_page);
          setPage(res.data.data.current_page);
        }
      } catch (err) {
        if (err.response.message === "Unauthorized") {
          logout();
        }
      }
    };

    const fetchService = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/services",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.check === true) {
          setServices(res.data.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
    fetchBooking();
  }, [page]);

  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      const matchesPhone =
        selectedPhone === "" ||
        booking.customer?.phone?.includes(selectedPhone);
      const matchesCustomer =
        selectedCustomer === "" ||
        booking.customer?.name
          ?.toLowerCase()
          .includes(selectedCustomer.toLowerCase());
      const matchesDate =
        selectedDate === null ||
        new Date(booking.time).toDateString() === selectedDate.toDateString();
      const matchesService =
        selectedService === "" ||
        booking.service?.some(
          (service) => service.id === parseInt(selectedService)
        );

      return matchesPhone && matchesCustomer && matchesDate && matchesService;
    });
    setFilteredBookings(filtered);
  }, [
    selectedPhone,
    selectedCustomer,
    selectedDate,
    selectedService,
    bookings,
  ]);

  useEffect(() => {
    const channel = window.pusher.subscribe("channelBookings");

    channel.bind("BookingCreated", (response) => {
      setBookings((prevData) => [response.bookingData, ...prevData]);
    });

    channel.bind("BookingUpdated", (response) => {
      setBookings((prevData) => {
        return prevData.map((booking) =>
          booking.id === response.bookingData.id
            ? response.bookingData
            : booking
        );
      });
    });
  }, []);

  return (
    <>
      <Container>
      <h4>Quản lý booking</h4>
      <Card className="card-primary card-outline mb-3">
        <Card.Header>
          <Card.Title className="h3">LỌC DANH SÁCH</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="service">Tên dịch vụ</Form.Label>
                <Form.Select
                  id="service"
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="customer">Tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  id="customer"
                  placeholder="Nhập tên khách hàng"
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone">Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setSelectedPhone(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="time">Thời gian</Form.Label>
                <DatePicker
                  id="time"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control"
                  placeholderText="Chọn ngày và giờ"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="table-container mt-3">
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>STT</th>
              <th style={{ width: '25%' }}>Tên dịch vụ</th>
              <th style={{ width: '20%' }}>Tên khách hàng</th>
              <th style={{ width: '15%' }}>Thời gian</th>
              <th style={{ width: '15%' }}>Số điện thoại</th>
              <th style={{ width: '10%' }}>Nhân viên</th>
              <th style={{ width: '10%' }}>Trạng thái</th>
              <th style={{ width: '10%' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      className="text-break"
                      title={item.service?.map((s) => s.name).join(", ")}
                    >
                      {item.service?.map((s) => s.name).join(", ")}
                    </span>
                  </td>
                  <td>{item.customer?.name}</td>
                  <td>{item.time}</td>
                  <td>{item.customer?.phone}</td>
                  <td>{item.user?.name || "Chưa sắp xếp nhân viên"}</td>
                  <td>
                    <span className={statusMap[item.status]?.class}>
                      <i className={statusMap[item.status]?.icon}></i>{" "}
                      {statusMap[item.status]?.text}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="info"
                        title="Chi tiết"
                        onClick={() => handleDetail(item.id)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
      </Container>

      <Paginated current={page} total={totalPage} handle={handlePageChange} />

      <p className="mb-4 text-end me-5">© 2024, Developed by 30GLOW</p>
    </>
  );
}

export default Index;
