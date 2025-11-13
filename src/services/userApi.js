import request from "./api";
import { setToken } from "./api";

// Регистрация пользователя
export const registerUser = async (login, name, password) => {
  const response = await request("/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });

  // Сохраняем токен после успешной регистрации
  if (response.user && response.user.token) {
    setToken(response.user.token);
  }

  return response;
};

// Авторизация пользователя
export const loginUser = async (login, password) => {
  const response = await request("/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });

  // Сохраняем токен после успешной авторизации
  if (response.user && response.user.token) {
    setToken(response.user.token);
  }

  return response;
};

// Получить список пользователей
export const getUsers = async () => {
  return await request("/user", {
    method: "GET",
  });
};

