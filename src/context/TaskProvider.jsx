import { useState } from "react";
import { TaskContext } from "./TaskContext";

// Провайдер для управления обновлением списка задач
const TaskProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Функция для обновления списка задач
  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TaskContext.Provider value={{ refreshKey, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

