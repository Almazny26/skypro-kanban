import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, removeToken } from "../services/api";

// Провайдер для управления авторизацией
const AuthProvider = ({ children }) => {
  // Проверяем наличие токена при инициализации
  const [isAuth, setIsAuth] = useState(() => {
    return !!getToken();
  });

  useEffect(() => {
    // Проверяем токен при монтировании компонента
    setIsAuth(!!getToken());
  }, []);

  // Функция входа - сохраняет токен и устанавливает авторизацию
  const login = () => {
    setIsAuth(true);
  };

  // Функция выхода - удаляет токен и сбрасывает авторизацию
  const logout = () => {
    removeToken();
    setIsAuth(false);
  };

  // Предоставляем данные и функции через контекст
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

