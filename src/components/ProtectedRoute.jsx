import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../services/api";

// проверяет авторизацию, если нет - редирект на логин
// replace чтобы нельзя было вернуться назад
function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  // Дополнительная проверка токена на случай, если он был удален в другом месте
  const token = getToken();
  const isAuthenticated = isAuth && token;
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

