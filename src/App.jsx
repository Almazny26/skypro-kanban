import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";

// просто обертка, вся логика в AppRoutes
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
