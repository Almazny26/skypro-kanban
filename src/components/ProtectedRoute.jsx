import { Navigate } from "react-router-dom";

// проверяет авторизацию, если нет - редирект на логин
// replace чтобы нельзя было вернуться назад
function ProtectedRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

