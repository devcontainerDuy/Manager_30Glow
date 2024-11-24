import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";
import Statistical from "./pages/Statistical/Statistical";
import Staff from "./pages/staff/Staff";
import Login from "./pages/Auth/Login";
import { store } from "./stores/store";
import Bill from "./pages/Bill/Bill";

function App() {
  const state = store.getState();
  const isLoggedIn = state.auth.token;
  const userRole = state.auth.role;
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
          path="/bill"
          element={
            <ProtectedRoute roleRequired="manager">
              <Bill />
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
