// Базовый URL API
const API_BASE_URL = "https://wedev-api.sky.pro/api";

// Функция для получения токена из localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Функция для сохранения токена в localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Функция для удаления токена из localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Базовая функция для выполнения запросов
const request = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  // НЕ добавляем Content-Type, так как API не умеет работать с этим заголовком

  // Добавляем токен авторизации, если он есть
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Создаем конфигурацию запроса
  const config = {
    method: options.method || "GET",
    headers,
  };

  // Добавляем body только если он есть (не для GET запросов)
  if (options.body) {
    config.body = options.body;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);

    // Проверяем статус ответа
    if (!response.ok) {
      let errorData = {};
      try {
        const text = await response.text();
        if (text) {
          errorData = JSON.parse(text);
        }
      } catch (e) {
        // Если не удалось распарсить JSON, оставляем пустой объект
        console.error("Не удалось распарсить ответ ошибки:", e);
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

    return await response.json();
  } catch (error) {
    // Если это уже обработанная ошибка, пробрасываем дальше
    if (error.status) {
      throw error;
    }
    // Иначе это сетевая ошибка
    throw {
      status: 0,
      message: "Ошибка сети. Проверьте подключение к интернету.",
      data: {},
    };
  }
};

export default request;
