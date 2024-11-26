import { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getBooking } from "../../services/BookingManager";
import Pagination from "../../components/pagination";
import { getStaff } from "../../services/Staff";
import { getService } from "../../services/ServiceManager";

function Index() {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  // useState tạo biến lần đầu tiên
  const [idBooking, setIdBooking] = useState(0);
  const [reasonCancel, setReasonCancel] = useState("");
  const [filter, setFilter] = useState({
    serviceName: "",
    customerName: "",
    phone: "",
    time: "",
  });

  const [limit, setLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotaPage] = useState(1);

  const [selectStaff, setSelectStaff] = useState("");
  // useState, useEffect nó chỉ chạy khi lần đầu khởi tạo và chỉ chạy 1 lần
  useEffect(() => {
    // useEffect gọi api tự tìm hiểu lifecircle của react classconponent functionconponent hook
    const fetchBooking = async () => {
      try {
        const response = await getBooking({ currentPage });
        setBookings(response.data);
        setTotaPage(response.data.last_page);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        setStaff(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchServices = async()=>{
      try {
        const response = await getService();
        setServices(response.data.data);
      } catch (error) {
        console.log('error',error);
        
      }
    }
    fetchBooking(); // chỉ gọi nó ra cho nó run
    fetchStaff(); // chỉ gọi nó ra cho nó run
    fetchServices(); // chỉ gọi nó ra cho nó run
  }, []);

  const handleSelectStaff = (bookingId) => {
    if (!selectStaff) {
      alert("Vui lòng chọn nhân viên!");
      return;
    }

    const updateBookings = bookings.data.map((booking) =>
      booking.id === idBooking
        ? { ...booking, staffId: selectStaff, status: 1 }
        : booking
    );
    setBookings({ ...bookings, data: updateBookings });
    console.log("update staff: ", updateBookings);
  };

  const handleCancelBooking = (id) => {
    setIdBooking(id);
    setOpen(true);
  };

  const submitCancelBooking = (bookingId) => {
    if (reasonCancel.trim()==="") {
      alert(`da huy bookingId ${bookingId} voi ly do ${reasonCancel} `);
      return;
    }
    
    const updateBookings = bookings.data.map((booking) =>
      booking.id === idBooking
    ? { ...booking, reasonCancel:'', status: 5 }
    : booking
  );
  setBookings({ ...bookings, data: updateBookings });
  console.log("cancel booking: ", updateBookings);
  alert(`da huy bookingId ${idBooking} voi ly do ${reasonCancel} `);
  handleClose();
};

const handleClose = () => {
  setOpen(false);
  setReasonCancel("");
  console.log("reasonCancel:", reasonCancel);
};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (limitPage) => {
    setLimit(limitPage);
    setCurrentPage(1);
  };

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
                  onChange={(e) => setReasonCancel(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-success"
                  onClick={submitCancelBooking}
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
              <select
                        onChange={(e) => {
                          setServices(e.target.value);
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn dịch vụ
                        </option>
                        {services.map((services, index) => (
                          <option key={index} value={services.id}>
                            {services.name}
                          </option>
                        ))}
                      </select>
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
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
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
              {bookings.data &&
                bookings.data.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.id}</td>
                    <td>
                      {booking.service.map((service, index) => (
                        <div key={index}>
                          {index + 1}-{service.name}
                        </div>
                      ))}
                    </td>
                    <td>{booking.customer.name}</td>
                    <td>{booking.phone}</td>
                    <td>{new Date(booking.time).toLocaleString()}</td>
                    <td>
                      <select
                        onChange={(e) => {
                          setSelectStaff(e.target.value);
                          setIdBooking(booking.id);
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Chọn nhân viên
                        </option>
                        {staff.map((staff, index) => (
                          <option key={index} value={staff.uid}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleSelectStaff(booking.id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className="btn btn-sm btn-danger ms-3" onClick={()=>handleCancelBooking(booking.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
        // limit={limit}
        // onChangeLimit={handleChangeLimit}
      />
      <p className="mb-4 text-end me-5">© 2024, Developed by 30GLOW</p>
    </>
  );
}

export default Index;
