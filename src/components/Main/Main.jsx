import { useEffect, useMemo, useState, useContext } from "react";
import Column from "../Column/Column";
import { Container } from "../../App.styled";
import { MainStyled, MainBlock, MainContent, Loading } from "./Main.styled";
import { getTasks } from "../../services/tasksApi";
import { TaskContext } from "../../context/TaskContext";

function Main() {
  const { tasks, setTasksList } = useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Загружаем задачи только при первой загрузке компонента
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const tasksFromApi = await getTasks();
        // Сохраняем задачи в контекст
        setTasksList(tasksFromApi);
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
        if (err.status === 401) {
          setError("Необходима авторизация. Пожалуйста, войдите в систему.");
        } else if (err.status === 400) {
          setError("Неверный запрос. Проверьте данные.");
        } else if (err.status === 0) {
          setError("Ошибка подключения к серверу. Проверьте интернет-соединение или попробуйте позже.");
        } else {
          setError(err.message || "Не удалось загрузить задачи");
        }
        setTasksList([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Загружаем задачи только если контекст пустой (первая загрузка)
    if (tasks.length === 0) {
      loadTasks();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Загружаем только один раз при монтировании

  // Преобразуем задачи из контекста в формат, который ожидает компонент
  const cards = useMemo(() => {
    return tasks.map((task) => ({
      id: task._id,
      title: task.title,
      topic: task.topic,
      date: new Date(task.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
      status: task.status,
      description: task.description || "",
    }));
  }, [tasks]);

  const columns = useMemo(() => {
    const statusTitles = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    const topicToClass = {
      "Web Design": "_orange",
      Research: "_green",
      Copywriting: "_purple",
      Testing: "_gray",
      Deploy: "_green",
    };

    let globalIndex = 0;
    const delayStepMs = 120;

    return statusTitles.map((statusTitle) => {
      const cardsForColumn = cards
        .filter((c) => c.status === statusTitle)
        .map((c) => ({
          id: c.id,
          title: c.title,
          category: c.topic,
          categoryClass: topicToClass[c.topic] || "_gray",
          date: c.date,
          delayMs: globalIndex++ * delayStepMs,
        }));
      return {
        title: statusTitle,
        cards: cardsForColumn,
      };
    });
  }, [cards]);

  return (
    <MainStyled>
      <Container>
        <MainBlock>
          <MainContent>
            {isLoading ? (
              <Loading>Данные загружаются</Loading>
            ) : error ? (
              <Loading>{error}</Loading>
            ) : (
              columns.map((column) => (
                <Column
                  key={column.title}
                  title={column.title}
                  cards={column.cards}
                />
              ))
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainStyled>
  );
}

export default Main;
