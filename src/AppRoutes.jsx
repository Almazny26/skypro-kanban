import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

// главный компонент с роутингом
// состояние авторизации проверяется в ProtectedRoute через контекст
function AppRoutes() {

  return (
    <Router>
      <Routes>
        {/* публичные страницы - доступны без авторизации */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />

        {/* защищенные страницы - нужна авторизация */}
        {/* ProtectedRoute проверяет isAuth, если false - редирект на /login */}
        {/* модальные окна (новая задача, просмотр карточки, выход) находятся в MainPage */}
        {/* роут для главной страницы */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна создания новой задачи */}
        <Route
          path="/new-card"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна просмотра карточки */}
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        {/* роут для модального окна выхода */}
        <Route
          path="/exit"
          element={
            <ProtectedRoute>
              <MainPage />
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
