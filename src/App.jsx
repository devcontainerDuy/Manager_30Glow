import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manager from "@/pages/Manager/Index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Manager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
