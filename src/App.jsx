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
import useAuthenContext from "@/contexts/AuthenContext";
import NotFound from "@/pages/Errors/NotFound";

function App() {
  const { user } = useAuthenContext();
  console.log("Tai khoan", user);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/manager" element={<Manager />} />
          <Route path="/statistical" element={<Statistical />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/dang-nhap" element={<Navigate to="/manager" />} />
          <Route path="*" element={<Navigate to="/manager" />} />
        </>
      ) : (
        <>
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="*" element={<Navigate to="/dang-nhap" />} />
        </>
      )}
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
