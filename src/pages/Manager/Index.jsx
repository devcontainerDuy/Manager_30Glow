import { useEffect, useState } from "react";
import "./index.css";
import Header from "@/layouts/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useAuthenContext from "@/contexts/AuthenContext";
import Paginated from "../../components/Paginated";

function Index() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { logout, token } = useAuthenContext();

  const statusMap = {
    0: { text: "Đang chờ xếp nhân viên", class: "text-warning", icon: "bi bi-clock" },
    1: { text: "Đã xếp nhân viên", class: "text-primary", icon: "bi bi-person-fill-check" },
    2: { text: "Đang thực hiện", class: "text-info", icon: "bi bi-chat-right-dots-fill" },
    3: { text: "Thành công", class: "text-success", icon: "bi bi-check-circle-fill" },
    4: { text: "Đã thanh toán", class: "text-success", icon: "bi bi-clipboard2-check-fill" },
    5: { text: "Thất bại", class: "text-danger", icon: "bi bi-x-circle" },
    default: { text: "Chưa xác định", class: "text-muted", icon: "bi bi-question-circle" },
  };

  const handleStatus = async (id) => {
    const status = statusMap[id] || statusMap.default;
    const { text, class: statusClass, icon } = status;

    // Sử dụng text, statusClass, và icon theo nhu cầu của bạn
    console.log(text, statusClass, icon);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/bookings?page=" + page, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.data.check === true) {
          setData(res.data.data.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response.message === "Unauthorized") {
          logout();
        }
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      <Header />
      {open && (
        <div className="modal" style={{ display: open ? "block" : "none" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ghi chú hủy</h5>
                <button type="button" className="btn-close" onClick={() => setOpen(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" placeholder="Ghi chú hủy ..." />
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-success">Xác nhận</button>
                <button className="btn btn-outline-secondary">Đóng</button>
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
              {/* <select defaultValue="">
                <option value="" disabled>
                  Chọn dịch vụ
                </option>
                {services.map((services, index) => (
                  <option key={index} value={services.id}>
                    {services.name}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="customerName" className="form-label">
                Họ tên khách hàng
              </label>
              <input placeholder="Nhập họ tên khách hàng" type="text" className="form-control" id="customerName" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="time" className="form-label">
                Thời gian
              </label>
              <input type="date" className="form-control" id="time" />
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
                <th>Thời gian</th>
                <th>Nhân viên</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span title={item.service && item.service.map((item) => item.name).join(", ")}>{item.service && item.service.map((item) => item.name).join(", ")}</span>
                  </td>
                  <td>{item.customer?.name}</td>
                  <td>{item.time}</td>
                  <td>{item.user?.name || "Chưa sắp xếp nhân viên"}</td>
                  <td>
                    <span className={statusMap[item.status]?.class}>
                      <i className={statusMap[item.status]?.icon}></i> {statusMap[item.status]?.text}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => setOpen(true)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className="btn btn-success">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Paginated current={page} total={totalPage} handle={handlePageChange} />

      <p className="mb-4 text-end me-5">© 2024, Developed by 30GLOW</p>
    </>
  );
}

export default Index;
