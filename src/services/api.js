// Базовый URL API - можно переопределить через .env файл
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://wedev-api.sky.pro/api";

// Получаю токен из localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Сохраняю токен в localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Удаляю токен и данные пользователя из localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userLogin");
};

// Сохраняю имя и логин пользователя в localStorage
export const setUserData = (name, login) => {
  if (name) localStorage.setItem("userName", name);
  if (login) localStorage.setItem("userLogin", login);
};

// Получаю имя пользователя из localStorage
export const getUserName = () => {
  return localStorage.getItem("userName");
};

// Получаю логин пользователя из localStorage
export const getUserLogin = () => {
  return localStorage.getItem("userLogin");
};

// Основная функция для выполнения запросов к API
const request = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  // API не принимает Content-Type заголовок, поэтому не добавляю его

  // Добавляю токен авторизации, если он есть
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Формирую конфигурацию запроса
  const config = {
    method: options.method || "GET",
    headers,
  };

  // Добавляю body только если он есть (для POST, PUT запросов)
  if (options.body) {
    config.body = options.body;
  }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);

      // Проверяю статус ответа - если не успешный, обрабатываю ошибку
      if (!response.ok) {
        let errorData = {};
        try {
          const text = await response.text();
          if (text) {
            errorData = JSON.parse(text);
          }
        } catch {
          // Если не удалось распарсить JSON, оставляю пустой объект
        }

      const errorMessage =
        errorData.error ||
        errorData.message ||
        (response.status === 400
          ? "Неверный запрос. Проверьте данные."
          : response.status === 401
          ? "Необходима авторизация."
          : response.status === 404
          ? "Ресурс не найден."
          : "Произошла ошибка");

      throw {
        status: response.status,
        message: errorMessage,
        data: errorData,
      };
    }

    // Парсю JSON ответ, если он есть
    try {
      const text = await response.text();
      if (text && text.trim()) {
        try {
          return JSON.parse(text);
        } catch {
          // Если JSON невалидный, возвращаю пустой объект
          return {};
        }
      }
    } catch {
      // Если не удалось прочитать ответ, возвращаю пустой объект
      return {};
    }
    
    // Если ответ пустой, возвращаю пустой объект
    return {};
  } catch (error) {
    // Если это уже обработанная ошибка, пробрасываю её дальше
    if (error.status) {
      throw error;
    }
    // Иначе это сетевая ошибка (нет интернета, сервер недоступен и т.д.)
    throw {
      status: 0,
      message: "Ошибка сети. Проверьте подключение к интернету.",
      data: {},
    };
  }
};

export default request;
