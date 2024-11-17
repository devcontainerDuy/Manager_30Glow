import { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getBooking } from "../../services/BookingManager";

function Index() {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  // useState tạo biến lần đầu tiên
  const [idBooking, setIdBooking] = useState(0);
  const [note, setNote] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [filter, setFilter] = useState({
    serviceName: "",
    customerName: "",
    phone: "",
    time: "",
  });
  const [selectedBookings, setSelectedBookings] = useState([]);
// useState, useEffect nó chỉ chạy khi lần đầu khởi tạo và chỉ chạy 1 lần 
  useEffect(() => {  // useEffect gọi api tự tìm hiểu lifecircle của react classconponent functionconponent hook
    const fetchBooking = async () => {
      try {
        const response = await getBooking();
        setBookings(response.data);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBooking();// chỉ gọi nó ra cho nó run
  }, []);

  const handleOpen = (id) => {
    setIdBooking(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNote("");
  };

  const cancelBooking = (id) => {
    handleOpen(id);
  };

  const submitCancel = () => {
    if (note === "") {
      alert("Vui lòng nhập lý do");
    } else {
      alert("Đã hủy công việc");
      setBookings(bookings.filter((booking) => booking.id !== idBooking));
      handleClose();
    }
  };

  const submitBooking = (id) => {
    const selectedEmployee = selectedEmployees[id];

    if (!selectedEmployee) {
      alert("Vui lòng chọn nhân viên trước khi hoàn thành công việc");
      return;
    }

    alert("Đã hoàn thành công việc");
    setBookings(bookings.filter((booking) => booking.id !== id));
    delete selectedEmployees[id]; // Remove the employee selection after booking is completed
  };

  const handleEmployeeChange = (bookingId, employee) => {
    setSelectedEmployees((prev) => ({ ...prev, [bookingId]: employee }));
  };

  const getAvailableEmployees = (bookingId) => {
    const chosenEmployees = Object.values(selectedEmployees);
    return ["nhan-vien-1", "nhan-vien-2", "nhan-vien-3"].filter(
      (emp) =>
        !chosenEmployees.includes(emp) || emp === selectedEmployees[bookingId]
    );
  };

  // const filteredBookings = bookings.filter(booking =>
  //   booking.service_name.toLowerCase().includes(filter.serviceName.toLowerCase()) &&
  //   booking.customer_name.toLowerCase().includes(filter.customerName.toLowerCase()) &&
  //   booking.phone.includes(filter.phone) &&
  //   booking.time.includes(filter.time)
  // );

  // const toggleSelectAll = () => {
  //   if (selectedBookings.length === filteredBookings.length) {
  //     setSelectedBookings([]);
  //   } else {
  //     setSelectedBookings(filteredBookings.map(booking => booking.id));
  //   }
  // };

  // const toggleSelectBooking = (id) => {
  //   setSelectedBookings((prevSelected) =>
  //     prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]
  //   );
  // };

  // const deleteSelectedBookings = () => {
  //   setBookings(bookings.filter((booking) => !selectedBookings.includes(booking.id)));
  //   setSelectedBookings([]);
  //   alert("Đã xóa các booking đã chọn");
  // };

  // console.log("Token", localStorage.getItem("token"));

  return (
    <>
      <Header />
      {open && (
        <div className="modal" style={{ display: open ? "block" : "none" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ghi chú hủy</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ghi chú hủy ..."
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-success"
                  onClick={submitCancel}
                >
                  Xác nhận
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <h4>Quản lý booking</h4>
        <div className="card card-primary card-outline text-sm mb-3">
          <div className="card-header">
            <h3 className="card-title">LỌC DANH SÁCH</h3>
          </div>
          <div className="card-body row form-group-category">
            <div className="form-group col-md-4">
              <label htmlFor="serviceName" className="form-label">
                Tên dịch vụ
              </label>
              <input
                type="text"
                className="form-control"
                id="serviceName"
                placeholder="Nhập tên dịch vụ"
                value={filter.serviceName}
                onChange={(e) =>
                  setFilter({ ...filter, serviceName: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="customerName" className="form-label">
                Họ tên khách hàng
              </label>
              <input
                placeholder="Nhập họ tên khách hàng"
                type="text"
                className="form-control"
                id="customerName"
                value={filter.customerName}
                onChange={(e) =>
                  setFilter({ ...filter, customerName: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={filter.phone}
                onChange={(e) =>
                  setFilter({ ...filter, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="time" className="form-label">
                Thời gian
              </label>
              <input
                type="date"
                className="form-control"
                id="time"
                value={filter.time}
                onChange={(e) => setFilter({ ...filter, time: e.target.value })}
              />
            </div>
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  // onChange={toggleSelectAll}
                  // checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                />
              </th>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Thời gian</th>
              <th>Nhân viên</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    // onChange={() => toggleSelectBooking(booking.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>
                  {booking.service.map((service, index) => (
                    <div key={index}>{index+1}-{service.name}</div>
                  ))}
                </td>
                <td>
                  {booking.customer.name}
                </td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.time).toLocaleString()}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleEmployeeChange(booking.id, e.target.value)
                    }
                    defaultValue={selectedEmployees[booking.id] || ""}
                  >
                    <option value="" disabled>
                      Chọn nhân viên
                    </option>
                    {getAvailableEmployees(booking.id).map((emp) => (
                      <option key={emp} value={emp}>
                        {emp}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {/* <button className="btn btn-sm btn-primary" onClick={() => submitBooking(booking.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button className="btn btn-sm btn-danger ms-3" onClick={() => cancelBooking(booking.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  </button> */}
                  <button className="btn btn-sm btn-primary" >
                  <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button className="btn btn-sm btn-danger ms-3">
                  <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
          {/* <button className="btn btn-danger" onClick={deleteSelectedBookings} disabled={selectedBookings.length === 0}>
            Xóa mục đã chọn
          </button> */}
        </div>
      </div>

      <nav className="d-flex justify-content-center mx-auto">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Page 1/4</span>
          </li>
          <li className="page-item disabled">
            <span className="page-link">First</span>
          </li>
          <li className="page-item active">
            <span className="page-link">1</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" rel="next">
              Next
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" rel="next">
              Last
            </a>
          </li>
        </ul>
      </nav>
      <p className="mb-4 text-end me-5">© 2024, Developed by 30GLOW</p>
    </>
  );
}

export default Index;
