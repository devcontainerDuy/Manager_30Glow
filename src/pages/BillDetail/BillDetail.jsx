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
                  <strong>Tên:</strong> {billDetail.customer?.name || "Không rõ"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {billDetail.customer?.phone || "Không rõ"}
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
                {billDetail.service &&
                  billDetail.service.map((item, index) => (
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
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
    }).isRequired,
    service: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        unit_price: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.string.isRequired,
  }).isRequired,
  formatter: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BillDetail;
