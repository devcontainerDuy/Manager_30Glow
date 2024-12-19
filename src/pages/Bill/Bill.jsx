import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";
import useAuthenContext from "@/contexts/AuthenContext";
import { faBan, faCashRegister, faCircleInfo, faQrcode } from "@fortawesome/free-solid-svg-icons";

function Bill() {
  const { token } = useAuthenContext();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [show, setShow] = useState(false);
  const [payMent, setPayMent] = useState(false);

  const handleClose = () => setShow(false);

  // Định dạng tiền tệ
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Map trạng thái hóa đơn
  const statusMap = {
    0: {
      text: "Chưa thanh toán",
      class: "badge text-bg-warning",
      icon: "bi bi-clock",
    },
    1: {
      text: "Đã thanh toán",
      class: "badge text-bg-success",
      icon: "bi bi-person-fill-check",
    },
    2: {
      text: "Thất bại",
      class: "badge text-bg-danger",
      icon: "bi bi-x-circle",
    },
  };

  // Xử lý khi nhấn nút xem chi tiết
  const handleDetail = async (uid) => {
    setShow(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bill-services/${uid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data.check === true) {
        setSelectedBill(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching bill detail:", error);
    }
  };

  const handlePayment = async (uid, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/bill-services/${uid}`,
        { status: status || 2 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.check === true) {
        window.notyf.success(res.data.message);
        setSelectedBill((prevState) => ({ ...prevState, status: status }));
        setBills((prevState) => prevState.map((item) => (item.uid === uid ? { ...item, status: status } : item)));
      } else {
        window.notyf.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching bill detail:", error);
    }
  };

  const handlePaymentQR = async (uid) => {
    try {
      const res = await axios.post("https://open.oapi.vn/banking/generate-qr", {
        bin: "970436",
        accountNo: "1027562701",
        accountName: "TRAN KHANH DUY",
        amount: parseInt(selectedBill.total).toString(),
        content: "Thanh toan hoa don: " + uid,
      });
      if (res.data.code === "success") {
        window.open(res.data.data, "_blank");
      }
    } catch (error) {
      console.error("Error fetching bill detail:", error.response.data.message);
    }
  };

  // Lấy dữ liệu hóa đơn từ API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/bill-services/create`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.data.check === true) {
          setBills(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [token]);

  return (
    <>
      <Container>
        <h4>Quản lý Hoá đơn</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mã hóa đơn</th>
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
                  <td>{`#${item.uid}`}</td>
                  <td>{item.customer?.name || "Không có"}</td>
                  <td>{item.customer?.phone || "Không có"}</td>
                  <td>{item.total ? formatter.format(item.total) : "N/A"} </td>
                  <td>
                    <span className={statusMap[item.status]?.class}>
                      <i className={statusMap[item.status]?.icon}></i> {statusMap[item.status]?.text || "Chưa xác định"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button type="button" variant="info" title="Chi tiết" onClick={() => handleDetail(item?.uid)}>
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

        {/* Modal hiển thị chi tiết hóa đơn */}
        {selectedBill && (
          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Chi Tiết Hóa Đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Render chi tiết hóa đơn ở đây */}
              <div className="mb-4">
                <h4 className="mb-3 text-center fw-bold">Thông tin khách hàng</h4>
                <div>
                  <p>
                    <strong>Tên:</strong> {selectedBill?.customer?.name || "Không rõ"}
                  </p>
                  <p>
                    <strong>Địa chỉ email:</strong> {selectedBill?.customer?.email || "Không rõ"}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {selectedBill?.customer?.phone || "Không rõ"}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {selectedBill?.customer?.address || "Không rõ"}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> <span className={statusMap[selectedBill.status]?.class}>{statusMap[selectedBill.status]?.text}</span>
                  </p>
                </div>
                <Form.Group className="mt-3">
                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Check type="checkbox" label="Thanh toán qua QR" id="paymentMethod" name="paymentMethod" value={1} onClick={() => setPayMent((prevState) => !prevState)} />
                </Form.Group>
              </div>
              <h4 className="mb-3 text-center fw-bold">Chi tiết hóa đơn</h4>
              <Table bordered>
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Tên dịch vụ</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.service &&
                    selectedBill.service.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{formatter.format(item.unit_price)}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <strong>Tổng cộng:</strong>
                    </td>
                    <td>{formatter.format(selectedBill.total)}</td>
                  </tr>
                </tfoot>
              </Table>
              {/* Thêm các chi tiết khác nếu cần */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <span className="me-2">Đóng</span>
                <FontAwesomeIcon icon={faCircleInfo} />
              </Button>
              {selectedBill.status !== 1 && (
                <>
                  <Button variant="success" onClick={() => handlePayment(selectedBill.uid, 1)}>
                    <span className="me-2">Đã thanh toán</span>
                    <FontAwesomeIcon icon={faCashRegister} />
                  </Button>
                  <Button variant="danger" onClick={() => handlePayment(selectedBill.uid, 2)}>
                    <span className="me-2">Chưa thanh toán</span>
                    <FontAwesomeIcon icon={faBan} />
                  </Button>
                </>
              )}
              {selectedBill.status === 0 && payMent === true && (
                <Button variant="primary" onClick={() => handlePaymentQR(selectedBill.uid)}>
                  <span className="me-2">Thanh toán qua QR</span>
                  <FontAwesomeIcon icon={faQrcode} />
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        )}
      </Container>

      <p className="mb-4 m-4 text-end me-5 fw-bold">© 2024, Developed by 30GLOW</p>
    </>
  );
}

export default Bill;
