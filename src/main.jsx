import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Точка входа в приложение
// StrictMode помогает находить проблемы в коде во время разработки
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
