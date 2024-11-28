import "./App.css";
import "./bootstrap";
import "notyf/notyf.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";
import Statistical from "@/pages/Statistical/Statistical";
import Staff from "@/pages/staff/Staff";
import Login from "@/pages/Auth/Login";
import Bill from "@/pages/Bill/Bill";
import useAuthenContext from "./contexts/AuthenContext";

function App() {
  const { token } = useAuthenContext();
  console.log("Tai khoan", token);
  return (
    <Routes>
      {/* {token ? (
        <> */}
      <Route path="/manager" element={<Manager />} />
      <Route path="/statistical" element={<Statistical />} />
      <Route path="/bill" element={<Bill />} />
      <Route path="/staff" element={<Staff />} />
      {/* </>
      ) : ( */}
      <Route path="/dang-nhap" element={<Login />} />
      {/* )} */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
