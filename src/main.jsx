import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";
import "./index.css";
import App from "./App.jsx";

// Тёмная тема, если она включена в системе
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ConfigProvider — общие настройки Ant Design на всё приложение:
        язык, цвета, скругления. Один раз здесь вместо CSS-переменных. */}
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#ff0033",
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
