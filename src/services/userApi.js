import request from "./api";
import { setToken, setUserData } from "./api";

// Регистрирую нового пользователя
export const registerUser = async (login, name, password) => {
  const response = await request("/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });

  // После успешной регистрации сохраняю токен и данные пользователя
  if (response.user) {
    if (response.user.token) {
      setToken(response.user.token);
    }
    if (response.user.name && response.user.login) {
      setUserData(response.user.name, response.user.login);
    }
  }

  return response;
};

// Авторизую пользователя
export const loginUser = async (login, password) => {
  const response = await request("/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });

  // После успешной авторизации сохраняю токен и данные пользователя
  if (response.user) {
    if (response.user.token) {
      setToken(response.user.token);
    }
    if (response.user.name && response.user.login) {
      setUserData(response.user.name, response.user.login);
    }
  }

  return response;
};

// Получаю список всех пользователей (если понадобится)
export const getUsers = async () => {
  return await request("/user", {
    method: "GET",
  });
};
