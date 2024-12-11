import "./App.css";
import "./bootstrap";
import "notyf/notyf.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";
import Show from "@/pages/Manager/Show.jsx";
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
          <Route path="/danh-sach-lich" element={<Manager />} />
          <Route path="/danh-sach-lich/chi-tiet/:id" element={<Show />} key="manager" />
          <Route path="/statistical" element={<Statistical />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/staff" element={<Staff />} />
        </>
      ) : (
        <>
              <Route path="/" element={<Login />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
