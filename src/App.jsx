import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";
import Baocao from "./pages/Baocao/Baocao";
import Login from "./pages/Auth/Login";



function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/manager" element={<Manager/>} />
        <Route path="/" element={<Login />} />
        <Route path="/baocao" element={<Baocao />} />
      </Routes>
    </Router>
  );
}

export default App;
