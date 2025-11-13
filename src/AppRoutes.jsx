import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

// главный компонент с роутингом
// тут хранится состояние авторизации
function AppRoutes() {
  // false = не авторизован, true = авторизован
  const [isAuth, setIsAuth] = useState(false);

  // вызывается при входе или регистрации
  const handleLogin = () => {
    setIsAuth(true);
  };

  // вызывается при выходе
  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    <Router>
      <Routes>
        {/* публичные страницы - доступны без авторизации */}
        <Route path="/login" element={<SignInPage onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<SignUpPage onLogin={handleLogin} />}
        />

        {/* защищенные страницы - нужна авторизация */}
        {/* ProtectedRoute проверяет isAuth, если false - редирект на /login */}
        {/* модальные окна (новая задача, просмотр карточки, выход) находятся в MainPage */}
        {/* роут для главной страницы */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна создания новой задачи */}
        <Route
          path="/new-card"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна просмотра карточки */}
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна выхода */}
        <Route
          path="/exit"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* * - любой другой путь, страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
