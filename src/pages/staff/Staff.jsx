import React, { useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import Header from "../../layouts/Header";

function Staff() {
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
          text: "warning",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "success",
        background: "green",
        color: "white",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "info",
        background: "#24b3f0",
        color: "white",
        duration: 1500,
        dismissible: false,
        icon: '<i class="bi bi-bag-check"></i>',
      },
    ],
  });

  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  return (
    <>
      <Header />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "16px",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            Ghi chú hủy
          </h2>
          <input
            type="text"
            placeholder="Ghi chú hủy ..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (note === "") {
                notyf.open({
                  type: "error",
                  message: "Vui lòng nhập lý do",
                });
              }
            }}
          >
            Xác nhận
          </button>
        </div>
      )}

      <div className="container">
        <h4>Danh sách lịch đặt</h4>
        <div className="container">
          <div className="row pt-2 ">
            <div className="col-md-12 text-center">
              <a
                style={{
                  textDecoration: "none",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
                target="_blank"
                rel="noopener noreferrer"
                href={`#`}
              >
                Tên Nhân viên
              </a>
            </div>
          </div>

          <div className="bg-white card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    Tên khách
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    disabled
                    value="Customer Name"
                    aria-describedby="basic-addon1"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    Số điện thoại
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    aria-label="Phone"
                    disabled
                    value="Phone Number"
                    aria-describedby="basic-addon2"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    Dịch vụ
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="services"
                    aria-label="services"
                    disabled
                    value="Dịch vụ"
                    aria-describedby="basic-addon2"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon3">
                    Thời gian
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="Time"
                    aria-label="Time"
                    disabled
                    value="2024-11-17T15:30"
                    aria-describedby="basic-addon3"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Staff;
