import request from "./api";

// Получить список задач
export const getTasks = async () => {
  const response = await request("/kanban", {
    method: "GET",
  });
  return response.tasks || [];
};

// Получить задачу по id
export const getTaskById = async (id) => {
  const response = await request(`/kanban/${id}`, {
    method: "GET",
  });
  return response.task;
};

// Создать новую задачу
export const createTask = async (taskData) => {
  const response = await request("/kanban", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
  return response.tasks || [];
};

// Обновить задачу
export const updateTask = async (id, taskData) => {
  const response = await request(`/kanban/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
  return response.tasks || [];
};

// Удалить задачу
export const deleteTask = async (id) => {
  const response = await request(`/kanban/${id}`, {
    method: "DELETE",
  });
  return response.tasks || [];
};

