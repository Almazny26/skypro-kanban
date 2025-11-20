import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../services/api";

// Компонент для защиты маршрутов - проверяет авторизацию пользователя
// Если пользователь не авторизован, редиректит на страницу входа
// replace используется, чтобы нельзя было вернуться назад через кнопку "назад"
function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  // Дополнительно проверяю токен на случай, если он был удален в другом месте
  const token = getToken();
  const isAuthenticated = isAuth && token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
