import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";
import Statistical from "./pages/Statistical/Statistical";
import Staff from "./pages/staff/Staff";
import Login from "./pages/Auth/Login";


function App() {
  const isLoggedIn = !!localStorage.getItem('token'); 
  const userRole = localStorage.getItem('role');

  const ProtectedRoute = ({ children, roleRequired }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    if (roleRequired && userRole !== roleRequired) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/manager"
          element={
            <ProtectedRoute roleRequired="manager">
              <Manager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistical"
          element={
            <ProtectedRoute roleRequired="manager">
              <Statistical />
            </ProtectedRoute>
          }
        />
        <Route
            path="/staff" 
            element={
              <ProtectedRoute roleRequired="staff">
                <Staff />
              </ProtectedRoute>
            }
          />

        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;