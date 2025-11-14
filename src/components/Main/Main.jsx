import { useEffect, useMemo, useState } from "react";
import Column from "../Column/Column";
import { Container } from "../../App.styled";
import { MainStyled, MainBlock, MainContent, Loading } from "./Main.styled";
import { getTasks } from "../../services/tasksApi";

function Main({ refreshKey = 0 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const tasks = await getTasks();
        // Преобразуем задачи из API в формат, который ожидает компонент
        const formattedTasks = tasks.map((task) => ({
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
        setCards(formattedTasks);
      } catch (err) {
        console.error("Ошибка при загрузке задач:", err);
        if (err.status === 401) {
          setError("Необходима авторизация. Пожалуйста, войдите в систему.");
        } else if (err.status === 400) {
          setError("Неверный запрос. Проверьте данные.");
        } else {
          setError(err.message || "Не удалось загрузить задачи");
        }
        setCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [refreshKey]); // Перезагружаем при изменении refreshKey

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
