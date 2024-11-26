import React from "react";
import Header from "../../layouts/Header";

function Bill() {
  return (
    <>
    <Header />
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h3>HÓA ĐƠN THANH TOÁN</h3>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5>Thông tin khách hàng:</h5>
            <p><strong>Tên:</strong> Nguyễn Văn A</p>
            <p><strong>Số điện thoại:</strong> 0123456789</p>
            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Thành phố XYZ</p>
          </div>
          <h5 className="mb-3">Chi tiết hóa đơn:</h5>
          <table className="table table-bordered">
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
              <tr>
                <td>1</td>
                <td>Sản phẩm A</td>
                <td>2</td>
                <td>100,000 VND</td>
                <td>200,000 VND</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sản phẩm B</td>
                <td>1</td>
                <td>150,000 VND</td>
                <td>150,000 VND</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end"><strong>Tổng cộng:</strong></td>
                <td><strong>350,000 VND</strong></td>
              </tr>
            </tfoot>
          </table>
          <div className="mt-4">
            <h5>Ghi chú:</h5>
            <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
          </div>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            In Hóa Đơn
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Bill;
