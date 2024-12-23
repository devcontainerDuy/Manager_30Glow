import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.jsx";
import { AuthenProvider } from "@/contexts/AuthenContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <AuthenProvider>
        <App />
      </AuthenProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </StrictMode>
);
