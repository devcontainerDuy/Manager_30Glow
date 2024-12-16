import PropTypes from "prop-types";
import { Button, Container, Modal, Table } from "react-bootstrap";

function Payment({ show, paymentBill, onClose }) {
  const amountBill = paymentBill.service
    ?.reduce((total, item) => total + item.price || item.compare_price, 0)
    .toLocaleString();

  const amount = Number(amountBill.replace(/\./g, "").replace(/\./g, "."));

  const qrInfo = {
    bankId: "VCB",
    accountNo: "1030035972",
    teample: "compact2",
    amount: amount,
    des: "Thanh toan dich vu",
    accountNa: "Nguyen Thanh Tam",
  };
  console.log(amountBill);
  return (
    <>
      <Container>
        <Modal show={show} onHide={onClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Chi Tiết Hóa Đơn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">
              <h4 className="mb-3 text-center fw-bold">Thông tin khách hàng</h4>
              <div>
                <p>
                  <strong>Tên:</strong>{" "}
                  {paymentBill.customer?.name || "Không rõ"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {paymentBill.customer?.phone || "Không rõ"}
                </p>
              </div>
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
                {paymentBill.service &&
                  paymentBill.service.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.name}{" "}
                        <span className="text-danger">
                          {item.price
                            ? `(${item.discount.toLocaleString()}%)`
                            : ""}{" "}
                        </span>
                      </td>
                      <td>{item.price.toLocaleString()} VND</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-end">
                    <strong>Tổng cộng:</strong>
                  </td>
                  <td>
                    {paymentBill.service
                      ?.reduce(
                        (total, item) =>
                          total + item.price || item.compare_price,
                        0
                      )
                      .toLocaleString()}{" "}
                    VND
                  </td>
                </tr>
              </tfoot>
            </Table>
            <img
              src={`https://img.vietqr.io/image/${qrInfo.bankId}-${qrInfo.accountNo}-${qrInfo.teample}.png?amount=${qrInfo.amount}&addInfo=${qrInfo.des}&accountName=${qrInfo.accountNa}`}
              alt=""
              className="img-fluid rounded mx-auto d-block mt-3"
            />
            {/* <div>
              {qrInfo.map((info) => {
                return (
                );
              })}
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

Payment.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Payment;
