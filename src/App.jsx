import "./App.css";
import "./bootstrap";
import "notyf/notyf.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Manager from "@/pages/Manager/Index.jsx";
import Show from "@/pages/Manager/Show.jsx";
import Statistical from "@/pages/Statistical/Statistical";
import Login from "@/pages/Auth/Login";
import Bill from "@/pages/Bill/Bill";
import useAuthenContext from "@/contexts/AuthenContext";
import NotFound from "@/pages/Errors/NotFound";
import ManagerLayout from "./layouts/ManagerLayout";

function App() {
  const { user, token } = useAuthenContext();

  return (
    <Routes>
      {token !== null || user === true ? (
        <>
          <Route element={<ManagerLayout />}>
            <Route path="/danh-sach-lich" element={<Manager />} />
            <Route path="/danh-sach-lich/chi-tiet/:id" element={<Show />} key="manager" />
            <Route path="/statistical" element={<Statistical />} />
            <Route path="/bill" element={<Bill />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
        </>
      )}
      {/* Xử lý NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
