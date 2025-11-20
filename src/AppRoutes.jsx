import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Компонент с настройкой всех маршрутов приложения
// ProtectedRoute проверяет авторизацию через контекст и редиректит на /login если не авторизован
function AppRoutes() {

  return (
    <Router>
      <Routes>
        {/* Публичные страницы - доступны всем */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />

        {/* Защищенные страницы-нужна авторизация */}
        {/* Модальные окна (новая задача, просмотр карточки, выход) рендерятся в MainPage */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* Роут для модального окна создания новой задачи */}
        <Route
          path="/new-card"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* Роут для модального окна просмотра/редактирования карточки */}
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* Роут для модального окна выхода */}
        <Route
          path="/exit"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        {/* Любой другой путь ведет на страницу 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
