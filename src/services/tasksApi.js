import request from "./api";

// Получаю список всех задач с сервера
export const getTasks = async () => {
  const response = await request("/kanban", {
    method: "GET",
  });
  return response.tasks || [];
};

// Получаю одну задачу по её id
export const getTaskById = async (id) => {
  const response = await request(`/kanban/${id}`, {
    method: "GET",
  });
  return response.task;
};

// Создаю новую задачу
export const createTask = async (taskData) => {
  const response = await request("/kanban", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
  return response.tasks || [];
};

// Обновляю существующую задачу
export const updateTask = async (id, taskData) => {
  const response = await request(`/kanban/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
  // API может вернуть пустой ответ или список задач
  // Если ответ пустой, операция все равно считается успешной
  return response.tasks || response || [];
};

// Удаляю задачу
export const deleteTask = async (id) => {
  const response = await request(`/kanban/${id}`, {
    method: "DELETE",
  });
  return response.tasks || [];
};

