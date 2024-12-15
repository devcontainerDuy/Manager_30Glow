import { Outlet } from "react-router-dom";
import Header from "./Header";

const ManagerLayout = () => {
  return (
    <div className="wrapper">
      <header className="header-item">
        <Header />
      </header>
      <div className="customer-layout">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
