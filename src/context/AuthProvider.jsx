import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getToken, removeToken, getUserName, getUserLogin } from "../services/api";

// Провайдер для управления авторизацией пользователя
const AuthProvider = ({ children }) => {
  // Проверяю, есть ли токен при загрузке приложения
  const [isAuth, setIsAuth] = useState(() => {
    return !!getToken();
  });

  // Загружаю имя и логин пользователя из localStorage
  const [userName, setUserName] = useState(() => getUserName() || "");
  const [userLogin, setUserLogin] = useState(() => getUserLogin() || "");

  useEffect(() => {
    // При монтировании компонента проверяю токен и загружаю данные пользователя
    setIsAuth(!!getToken());
    setUserName(getUserName() || "");
    setUserLogin(getUserLogin() || "");
  }, []);

  // Функция входа - авторизую пользователя
  const login = () => {
    setIsAuth(true);
    // Обновляю данные пользователя из localStorage
    setUserName(getUserName() || "");
    setUserLogin(getUserLogin() || "");
  };

  // Функция выхода - разлогиниваю пользователя
  const logout = () => {
    removeToken();
    setIsAuth(false);
    setUserName("");
    setUserLogin("");
  };

  // Предоставляю данные и функции через контекст для использования во всем приложении
  return (
    <AuthContext.Provider value={{ isAuth, login, logout, userName, userLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

