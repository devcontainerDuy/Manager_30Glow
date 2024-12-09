import PropTypes from "prop-types";
import { Button, Container, Modal, Table } from "react-bootstrap";

function BillDetail({ show, billDetail, formatter, onClose }) {
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
                  <strong>Tên:</strong> {billDetail.customer_name}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {billDetail.customer_phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {billDetail.address}
                </p>
              </div>
            </div>
            <h4 className="mb-3 text-center fw-bold">Chi tiết hóa đơn</h4>
            <Table bordered>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {billDetail.details &&
                  billDetail.details.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatter.format(item.unit_price)}</td>
                      <td>
                        {formatter.format(item.unit_price * item.quantity)}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end">
                    <strong>Tổng cộng:</strong>
                  </td>
                  <td>{formatter.format(billDetail.total)}</td>
                </tr>
              </tfoot>
            </Table>
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
BillDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  billDetail: PropTypes.shape({
    customer_name: PropTypes.string.isRequired,
    customer_phone: PropTypes.string.isRequired,
    address: PropTypes.string,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        product_name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit_price: PropTypes.number.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  formatter: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BillDetail;
