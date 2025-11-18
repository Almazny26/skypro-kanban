import { useState, useCallback } from "react";
import { TaskContext } from "./TaskContext";

// Провайдер для управления списком задач
// Хранит все задачи в контексте и предоставляет методы для работы с ними
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Добавляю новую задачу в список
  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  // Обновляю существующую задачу в списке
  const updateTask = useCallback((taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId || task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  // Удаляю задачу из списка
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== taskId && task.id !== taskId)
    );
  }, []);

  // Устанавливаю весь список задач (используется при первой загрузке с сервера)
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

