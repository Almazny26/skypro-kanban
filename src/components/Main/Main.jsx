import { useEffect, useMemo, useState, useContext } from "react";
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "../Column/Column";
import { Container } from "../../App.styled";
import { MainStyled, MainBlock, MainContent, Loading, Spinner, EmptyState, SkeletonContainer } from "./Main.styled";
import { getTasks, updateTask } from "../../services/tasksApi";
import { TaskContext } from "../../context/TaskContext";
import { ThemeContext } from "../../context/ThemeContext";
import SearchFilter from "../SearchFilter/SearchFilter";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { toast } from "react-toastify";

function Main() {
  const { tasks, setTasksList, updateTask: updateTaskInContext } = useContext(TaskContext);
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Загружаю задачи с сервера при первой загрузке компонента
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const tasksFromApi = await getTasks();
        // Сохраняю задачи в контекст, чтобы они были доступны во всем приложении
        setTasksList(tasksFromApi);
      } catch (err) {
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

    // Загружаю задачи только если их еще нет в контексте
    if (tasks.length === 0) {
      loadTasks();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Загружаю только один раз при монтировании компонента

  // Преобразую задачи из контекста в формат для отображения на доске
  const cards = useMemo(() => {
    let filteredTasks = tasks;

    // Фильтрую задачи по поисковому запросу
    if (searchQuery.trim()) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTasks.map((task) => ({
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
        }, [tasks, searchQuery]);

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

  const hasFilteredResults = columns.some((column) => column.cards.length > 0);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    setOverId(event.over?.id || null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  const findColumnForCard = (cardId) => {
    for (const column of columns) {
      if (column.cards.some((card) => card.id === cardId)) {
        return column.title;
      }
    }
    return null;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) {
      return;
    }

    // Нахожу карточку, которую перетаскиваю
    const activeCard = cards.find((card) => card.id === active.id);
    if (!activeCard) {
      return;
    }

    // Определяю новый статус в зависимости от того, куда перетащили карточку
    const statusTitles = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    let newStatus = null;

    // Если перетащили прямо на колонку (на пустое место)
    if (statusTitles.includes(over.id)) {
      newStatus = over.id;
    } else {
      // Если перетащили на другую карточку, беру статус этой карточки
      const overCard = cards.find((card) => card.id === over.id);
      if (overCard) {
        newStatus = overCard.status;
      } else {
        // Пытаюсь найти колонку через вспомогательную функцию
        // Это может быть дочерний элемент карточки (ссылка, кнопка и т.д.)
        newStatus = findColumnForCard(over.id);
        
        // Если не нашел, ищу через DOM элементы
        if (!newStatus) {
          // Ищу родительский элемент с data-card-id или data-column-id
          const overElement = document.querySelector(`[data-card-id="${over.id}"]`) ||
                             document.querySelector(`[data-column-id="${over.id}"]`);
          
          if (overElement) {
            const cardId = overElement.getAttribute("data-card-id");
            const columnId = overElement.getAttribute("data-column-id");
            
            if (cardId) {
              const card = cards.find((c) => c.id === cardId);
              if (card) {
                newStatus = card.status;
              }
            } else if (columnId && statusTitles.includes(columnId)) {
              newStatus = columnId;
            }
          }
        }
      }
    }

    // Если не удалось определить новый статус, ничего не делаю
    if (!newStatus) {
      return;
    }

    // Если статус не изменился, ничего не делаю
    if (activeCard.status === newStatus) {
      return;
    }

    // Нахожу исходную задачу в контексте
    const originalTask = tasks.find((task) => task._id === active.id);
    if (!originalTask) {
      return;
    }

    // Сразу обновляю UI (оптимистичное обновление)
    updateTaskInContext(active.id, { status: newStatus });

    try {
      // Отправляю обновление на сервер
      await updateTask(active.id, {
        title: originalTask.title,
        topic: originalTask.topic,
        status: newStatus,
        description: originalTask.description || "",
        date: originalTask.date,
      });
      toast.success("Статус задачи обновлен!");
    } catch (err) {
      // Если ошибка, откатываю изменения обратно
      updateTaskInContext(active.id, { status: activeCard.status });
      
      if (err.status === 400) {
        const errorMessage =
          err.data?.error ||
          err.data?.message ||
          err.message ||
          "Не удалось обновить статус задачи";
        toast.error(errorMessage);
      } else if (err.status === 0) {
        toast.error("Ошибка подключения к серверу. Проверьте интернет-соединение.");
      } else {
        toast.error(err.message || "Произошла ошибка при обновлении статуса");
      }
    }
  };

  const activeCard = activeId ? cards.find((card) => card.id === activeId) : null;

  return (
    <MainStyled>
      <Container>
        <MainBlock>
          {!isLoading && !error && tasks.length > 0 && (
            <SearchFilter
              onSearch={setSearchQuery}
              searchValue={searchQuery}
            />
          )}
          <MainContent>
            {isLoading ? (
              <SkeletonContainer>
                {[
                  { title: "Без статуса", count: 5 },
                  { title: "Нужно сделать", count: 3 },
                  { title: "В работе", count: 3 },
                  { title: "Тестирование", count: 2 },
                  { title: "Готово", count: 2 },
                ].map((column, colIndex) => (
                  <div key={column.title} style={{ width: "20%", margin: "0 auto", display: "block" }}>
                    <div style={{ padding: "0 10px", margin: "15px 0" }}>
                      <p style={{ 
                        color: theme?.textSecondary || "#94a6be", 
                        fontSize: "14px", 
                        fontWeight: 600, 
                        lineHeight: 1, 
                        textTransform: "uppercase" 
                      }}>
                        {column.title}
                      </p>
                    </div>
                    <div style={{ width: "100%", display: "block", position: "relative" }}>
                      {Array.from({ length: column.count }).map((_, cardIndex) => {
                        // Вычисляю общий индекс для правильной задержки анимации скелетона
                        let totalIndex = 0;
                        for (let i = 0; i < colIndex; i++) {
                          const prevCounts = [5, 3, 3, 2, 2];
                          totalIndex += prevCounts[i];
                        }
                        totalIndex += cardIndex;
                        return (
                          <SkeletonCard key={cardIndex} delayMs={totalIndex * 120} />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </SkeletonContainer>
            ) : error ? (
              <Loading>{error}</Loading>
            ) : tasks.length === 0 ? (
              <EmptyState>Новых задач нет</EmptyState>
            ) : !hasFilteredResults ? (
              <EmptyState>Задачи не найдены</EmptyState>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                {columns.map((column) => (
                  <Column
                    key={column.title}
                    id={column.title}
                    title={column.title}
                    cards={column.cards}
                    activeId={activeId}
                    overId={overId}
                  />
                ))}
                <DragOverlay>
                  {activeCard ? (
                    <div
                      style={{
                        width: "220px",
                        height: "130px",
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        padding: "15px 13px 19px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        opacity: 0.9,
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        {activeCard.title}
                      </div>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainStyled>
  );
}

export default Main;
