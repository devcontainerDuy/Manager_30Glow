import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BillDetail from "../BillDetail/BillDetail";

function Bill() {
  const { token } = useAuthenContext();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  // Định dạng tiền tệ
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Map trạng thái hóa đơn
  const statusMap = {
    0: {
      text: "Đang chờ xử lý",
      class: "text-warning",
      icon: "bi bi-clock",
    },
    1: {
      text: "Đã xác nhận",
      class: "text-primary",
      icon: "bi bi-person-fill-check",
    },
    2: {
      text: "Thất bại",
      class: "text-danger",
      icon: "bi bi-x-circle",
    },
    default: {
      text: "Chưa xác định",
      class: "text-muted",
      icon: "bi bi-question-circle",
    },
  };

  // Lấy dữ liệu hóa đơn từ API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/bill-services/create`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("API response:", res.data); // Log dữ liệu trả về
        if (res.data.check === true) {
          setBills(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [token]);

  // Xử lý khi nhấn nút xem chi tiết
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
                  <td>{item.customer?.name || "Không có"}</td> 
                  <td>{item.customer?.phone || "Không có"}</td> 
                  <td>
                    {item.total ? formatter.format(item.total) : "N/A"}{" "}
                    
                  </td>
                  <td>
                    <span className={statusMap[item.status]?.class}>
                      <i className={statusMap[item.status]?.icon}></i>{" "}
                      {statusMap[item.status]?.text || "Chưa xác định"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                    
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
                <td colSpan="6" className="text-center">
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
          onClose={() => setSelectedBill(null)} // Đóng chi tiết hóa đơn
        />
      )}
    </>
  );
}

export default Bill;
