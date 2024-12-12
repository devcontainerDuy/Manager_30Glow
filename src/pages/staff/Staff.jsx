
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import Header from "../../layouts/Header";
import useAuthenContext from "@/contexts/AuthenContext";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Staff() {
  const { user } = useAuthenContext();
  const [bookings, setBookings] = useState([]);

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


  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "success",
        background: "green",
        color: "white",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "info",
        background: "#24b3f0",
        color: "white",
        duration: 1500,
        dismissible: false,
        icon: '<i class="bi bi-bag-check"></i>',
      },
    ],
  });

  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  return (
    <>

      <Header />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "16px",
          }}
        >

          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Ghi chú hủy
          </h2>

          <input
            type="text"
            placeholder="Ghi chú hủy ..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (note === "") {
                notyf.open({
                  type: "error",
                  message: "Vui lòng nhập lý do",
                });
              }
            }}
          >
            Xác nhận
          </button>
        </div>
      )}

      <div className="container">

        <h4>Danh sách lịch đặt</h4>
        <div className="container">
          <div className="bg-white card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    Tên Nhân Viên
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    disabled
                    value={user.name}
                    aria-describedby="basic-addon1"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    Số điện thoại
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    aria-label="Phone"
                    disabled
                    value={user.phone}
                    aria-describedby="basic-addon2"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    Email
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="services"
                    aria-label="services"
                    disabled
                    value={user.email}
                    aria-describedby="basic-addon2"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên dịch vụ</th>
                    <th>Tên khách hàng</th>
                    <th>Thời gian</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <span
                            className="text-break"
                            title={
                              item.service &&
                              item.service.map((item) => item.name).join(", ")
                            }
                          >
                            {item.service &&
                              item.service.map((item) => item.name).join(", ")}
                          </span>
                        </td>
                        <td>{item.customer?.name}</td>
                        <td>{item.time}</td>
                        <td>{item.customer?.phone}</td>
                        <td>
                          <span className={statusMap[item.status]?.class}>
                            <i className={statusMap[item.status]?.icon}></i>{" "}
                            {statusMap[item.status]?.text}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button type="button" variant="danger">
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                            <Button
                              type="button"
                              variant="info"
                              title="Chi tiết"
                              // onClick={() => handleDetail(item.id)}
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

              {/* <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon3">
                    Thời gian
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Time"
                    aria-label="Time"
                    disabled
                    value="2024-11-17T15:30"
                    aria-describedby="basic-addon3"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* <div className="text-end bg-white card-footer text-muted">
            <button
              className="btn btn-sm btn-primary"
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "#fff",
              }}
              onClick={() => {}}
            >
              Hoàn thành
            </button>
            <button
              className="btn btn-sm btn-danger ms-3"
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                border: "1px solid #dc3545",
                backgroundColor: "#dc3545",
                color: "#fff",
              }}
              onClick={() => setOpen(true)}
            >
              Hủy
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Staff;
