import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTaskById, updateTask, deleteTask } from "../../services/tasksApi";
import CalendarPicker from "../Calendar/CalendarPicker";
import { TaskContext } from "../../context/TaskContext";

function PopBrowse({ cardId }) {
  const { updateTask: updateTaskInContext, deleteTask: deleteTaskInContext } =
    useContext(TaskContext);
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Web Design");
  const [status, setStatus] = useState("Без статуса");
  const [date, setDate] = useState("");

  const statusOptions = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const topicOptions = ["Web Design", "Research", "Copywriting"];

  useEffect(() => {
    if (cardId) {
      loadTask();
    }
  }, [cardId]);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      setError("");
      const taskData = await getTaskById(cardId);
      setTask(taskData);
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setTopic(taskData.topic || "Web Design");
      setStatus(taskData.status || "Без статуса");
      setDate(taskData.date || new Date().toISOString());
    } catch (err) {
      console.error("Ошибка при загрузке задачи:", err);
      if (err.status === 404) {
        setError("Задача не найдена");
      } else {
        setError("Не удалось загрузить задачу");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setTopic(task.topic || "Web Design");
      setStatus(task.status || "Без статуса");
      setDate(task.date || new Date().toISOString());
    }
  };

  const handleSave = async () => {
    setError("");

    // Валидация полей перед отправкой
    if (!title || !title.trim()) {
      setError(
        "Пожалуйста, заполните все обязательные поля. Введите название задачи."
      );
      return;
    }
    if (!topic || !topic.trim()) {
      setError(
        "Пожалуйста, заполните все обязательные поля. Выберите категорию."
      );
      return;
    }
    if (!status || !status.trim()) {
      setError("Пожалуйста, заполните все обязательные поля. Выберите статус.");
      return;
    }
    if (!date) {
      setError("Пожалуйста, заполните все обязательные поля. Выберите дату.");
      return;
    }
    // Проверяем, что дата валидна
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      setError("Пожалуйста, заполните все обязательные поля. Выберите дату.");
      return;
    }

    try {
      // Используем дату в том же формате, в котором она пришла от API
      // Если дата была изменена через календарь, она уже в формате ISO
      let dateToSend = date;
      if (date) {
        // Если дата - это строка, которая не является ISO, преобразуем её
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          // Используем ISO формат, как при создании задачи
          dateToSend = dateObj.toISOString();
        }
      }

      const taskData = {
        title: title.trim(),
        topic: topic.trim(),
        status: status.trim(),
        description: description ? description.trim() : "",
        date: dateToSend,
      };

      // Проверяем, что все обязательные поля не пустые
      if (
        !taskData.title ||
        !taskData.topic ||
        !taskData.status ||
        !taskData.date
      ) {
        setError("Все обязательные поля должны быть заполнены");
        return;
      }

      console.log("Отправка данных задачи:", taskData);
      await updateTask(cardId, taskData);

      // Обновляем задачу в контексте без GET запроса
      updateTaskInContext(cardId, {
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description,
        date: taskData.date,
      });

      // Обновляем локальное состояние задачи
      setTask({
        ...task,
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description,
        date: taskData.date,
      });
      setTitle(taskData.title);
      setDescription(taskData.description);
      setTopic(taskData.topic);
      setStatus(taskData.status);
      setDate(taskData.date);

      setIsEditing(false);
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);
      console.error("Детали ошибки:", err.data);
      if (err.status === 400) {
        // Показываем детальное сообщение об ошибке от API, если оно есть
        const errorMessage =
          err.data?.error ||
          err.data?.message ||
          err.message ||
          "Неверные данные задачи. Проверьте все поля.";
        setError(errorMessage);
      } else if (err.status === 401) {
        setError("Необходима авторизация");
        navigate("/login");
      } else {
        setError(err.message || "Произошла ошибка при обновлении задачи");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      return;
    }

    try {
      setError("");
      await deleteTask(cardId);
      // Удаляем задачу из контекста без GET запроса
      deleteTaskInContext(cardId);
      navigate("/");
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
      if (err.status === 401) {
        setError("Необходима авторизация");
        navigate("/login");
      } else {
        setError(err.message || "Произошла ошибка при удалении задачи");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="pop-browse" id="popBrowse">
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content">
              <p>Загрузка...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="pop-browse" id="popBrowse">
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content">
              <p style={{ color: "#ff0000" }}>{error}</p>
              <button onClick={() => navigate("/")}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    border: "1px solid #d0cece",
                    padding: "8px",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />
              ) : (
                <h3 className="pop-browse__ttl">
                  {task?.title || "Название задачи"}
                </h3>
              )}
              <div
                className={`categories__theme theme-top ${
                  topic === "Web Design"
                    ? "_orange"
                    : topic === "Research"
                    ? "_green"
                    : "_purple"
                } _active-category`}
              >
                <p
                  className={
                    topic === "Web Design"
                      ? "_orange"
                      : topic === "Research"
                      ? "_green"
                      : "_purple"
                  }
                >
                  {topic}
                </p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              {isEditing ? (
                <div className="status__themes">
                  {statusOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`status__theme ${
                        status === opt ? "status__theme--selected" : ""
                      }`}
                      onClick={() => setStatus(opt)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <p>{opt}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="status__themes">
                  {statusOptions.map((opt) => (
                    <div
                      key={opt}
                      className={`status__theme ${
                        status === opt ? "" : "_hide"
                      } ${status === "Нужно сделать" ? "_gray" : ""}`}
                    >
                      <p className={status === "Нужно сделать" ? "_gray" : ""}>
                        {opt}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pop-browse__wrap">
              <form
                className="pop-browse__form form-browse"
                id="formBrowseCard"
                action="#"
              >
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly={!isEditing}
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
              <div className="pop-new-card__calendar calendar">
                <p className="calendar__ttl subttl">Даты</p>
                <CalendarPicker
                  selectedDate={date}
                  onDateChange={setDate}
                  isEditing={isEditing}
                />
              </div>
            </div>
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              {isEditing ? (
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #d0cece",
                    fontSize: "16px",
                  }}
                >
                  {topicOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <div
                  className={`categories__theme ${
                    topic === "Web Design"
                      ? "_orange"
                      : topic === "Research"
                      ? "_green"
                      : "_purple"
                  } _active-category`}
                >
                  <p
                    className={
                      topic === "Web Design"
                        ? "_orange"
                        : topic === "Research"
                        ? "_green"
                        : "_purple"
                    }
                  >
                    {topic}
                  </p>
                </div>
              )}
            </div>
            {error && (
              <div
                style={{
                  color: "#ff0000",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
            {!isEditing ? (
              <div className="pop-browse__btn-browse ">
                <div className="btn-group">
                  <button
                    className="btn-browse__edit _btn-bor _hover03"
                    onClick={handleEdit}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Редактировать задачу
                    </a>
                  </button>
                  <button
                    className="btn-browse__delete _btn-bor _hover03"
                    onClick={handleDelete}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Удалить задачу
                    </a>
                  </button>
                </div>
                <button className="btn-browse__close _btn-bg _hover01">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  >
                    Закрыть
                  </a>
                </button>
              </div>
            ) : (
              <div className="pop-browse__btn-edit">
                <div className="btn-group">
                  <button
                    className="btn-edit__edit _btn-bg _hover01"
                    onClick={handleSave}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Сохранить
                    </a>
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    onClick={handleCancel}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Отменить
                    </a>
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    id="btnDelete"
                    onClick={handleDelete}
                  >
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Удалить задачу
                    </a>
                  </button>
                </div>
                <button className="btn-edit__close _btn-bg _hover01">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  >
                    Закрыть
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;
