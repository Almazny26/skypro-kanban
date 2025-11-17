import { useState, useCallback } from "react";
import { TaskContext } from "./TaskContext";

// Провайдер для управления списком задач
// Хранит задачи в контексте и предоставляет методы для их обновления
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Добавить задачу в список
  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  // Обновить задачу в списке
  const updateTask = useCallback((taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId || task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  // Удалить задачу из списка
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== taskId && task.id !== taskId)
    );
  }, []);

  // Установить список задач (для первой загрузки)
  const setTasksList = useCallback((tasksList) => {
    setTasks(tasksList);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        setTasksList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

