import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "@/contexts";
import "./index.css";
import { translator } from "@/utils";
import { ConfigProvider } from "antd";

translator.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ConfigProvider theme={{ token: { fontFamily: "roboto" } }}>
        <App />
      </ConfigProvider>
    </AuthProvider>
  </BrowserRouter>
);
