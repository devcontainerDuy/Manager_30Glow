import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BillDetail from "../BillDetail/BillDetail";
// import PropTypes from "prop-types";

function Bill() {
  const { token } = useAuthenContext();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

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
    const fetchBills = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/bills/list",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data.check === true) {
          setBills(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBills();
  }, [token]);

  const handleDetail = (bill) => {
    setSelectedBill(bill);
  };

  return (
    <>
      <Container>
        <h4>Quản lý Hoá đơn</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 ? (
              bills.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.customer_phone}</td>
                  <td>{formatter.format(item.total)}</td>
                  <td>
                    <span className={statusMap[item.status]?.class}>
                      <i className={statusMap[item.status]?.icon}></i>
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
                        onClick={() => handleDetail(item)}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      {selectedBill && (
        <BillDetail
          show={!!selectedBill}
          billDetail={selectedBill}
          formatter={formatter}
          onClose={() => setSelectedBill(null)} // Close detail view
        />
      )}
    </>
  );
}

export default Bill;
