import { useContext } from "react";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";
import ThemeProvider from "./context/ThemeProvider";
import { ThemeContext } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastWrapper = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDark ? "dark" : "light"}
    />
  );
};

// Главный компонент приложения - обертка с провайдерами
// Вся логика роутинга находится в AppRoutes
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <AppRoutes />
          <ToastWrapper />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
