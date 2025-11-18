import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTaskById, updateTask, deleteTask } from "../../services/tasksApi";
import CalendarPicker from "../Calendar/CalendarPicker";
import { TaskContext } from "../../context/TaskContext";
import { toast } from "react-toastify";

function PopBrowse({ cardId }) {
  const { tasks, updateTask: updateTaskInContext, deleteTask: deleteTaskInContext } =
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  // Загружаю задачу для просмотра/редактирования
  const loadTask = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Сначала проверяю, есть ли задача уже в контексте (быстрее, чем запрос к серверу)
      const taskFromContext = tasks.find((t) => t._id === cardId);
      
      if (taskFromContext) {
        // Если нашел в контексте, использую её данные
        setTask(taskFromContext);
        setTitle(taskFromContext.title || "");
        setDescription(taskFromContext.description || "");
        setTopic(taskFromContext.topic || "Web Design");
        setStatus(taskFromContext.status || "Без статуса");
        setDate(taskFromContext.date || new Date().toISOString());
        setIsLoading(false);
        return;
      }
      
      // Если не нашел в контексте, загружаю с сервера
      const taskData = await getTaskById(cardId);
      setTask(taskData);
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setTopic(taskData.topic || "Web Design");
      setStatus(taskData.status || "Без статуса");
      setDate(taskData.date || new Date().toISOString());
    } catch (err) {
      // Если сервер вернул 404, но задача есть в контексте, использую её
      if (err.status === 404) {
        const taskFromContext = tasks.find((t) => t._id === cardId);
        if (taskFromContext) {
          // Использую задачу из контекста
          setTask(taskFromContext);
          setTitle(taskFromContext.title || "");
          setDescription(taskFromContext.description || "");
          setTopic(taskFromContext.topic || "Web Design");
          setStatus(taskFromContext.status || "Без статуса");
          setDate(taskFromContext.date || new Date().toISOString());
          setError("");
        } else {
          setError("Задача не найдена");
        }
      } else if (err.status === 401) {
        setError("Необходима авторизация");
        navigate("/login");
      } else if (err.status === 0) {
        // При ошибке сети пытаюсь использовать данные из контекста
        const taskFromContext = tasks.find((t) => t._id === cardId);
        if (taskFromContext) {
          setTask(taskFromContext);
          setTitle(taskFromContext.title || "");
          setDescription(taskFromContext.description || "");
          setTopic(taskFromContext.topic || "Web Design");
          setStatus(taskFromContext.status || "Без статуса");
          setDate(taskFromContext.date || new Date().toISOString());
          setError("");
        } else {
          setError("Ошибка подключения к серверу. Проверьте интернет-соединение или попробуйте позже.");
        }
      } else {
        setError(err.message || "Не удалось загрузить задачу");
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

  // Обработчик сохранения изменений задачи
  const handleSave = async () => {
    setError("");

    // Проверяю, что все обязательные поля заполнены
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
    // Проверяю, что дата валидна
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      setError("Пожалуйста, заполните все обязательные поля. Выберите дату.");
      return;
    }

    try {
      // Преобразую дату в ISO формат для отправки на сервер
      let dateToSend = date;
      if (date) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
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

      // Еще раз проверяю, что все поля заполнены
      if (
        !taskData.title ||
        !taskData.topic ||
        !taskData.status ||
        !taskData.date
      ) {
        setError("Все обязательные поля должны быть заполнены");
        return;
      }

      await updateTask(cardId, taskData);

      // Обновляю задачу в контексте, чтобы изменения сразу отобразились на доске
      updateTaskInContext(cardId, {
        title: taskData.title,
        topic: taskData.topic,
        status: taskData.status,
        description: taskData.description,
        date: taskData.date,
      });

      // Обновляю локальное состояние, чтобы форма отображала актуальные данные
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
      toast.success("Задача успешно обновлена!");
    } catch (err) {
      if (err.status === 400) {
        // Показываю детальное сообщение об ошибке от сервера
        const errorMessage =
          err.data?.error ||
          err.data?.message ||
          err.message ||
          "Неверные данные задачи. Проверьте все поля.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (err.status === 401) {
        setError("Необходима авторизация");
        toast.error("Необходима авторизация");
        navigate("/login");
      } else if (err.status === 0) {
        const errorMsg = "Ошибка подключения к серверу. Проверьте интернет-соединение или попробуйте позже.";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.message || "Произошла ошибка при обновлении задачи";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  // Обработчик удаления задачи
  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      return;
    }

    try {
      setError("");
      await deleteTask(cardId);
      // Удаляю задачу из контекста, чтобы она сразу исчезла с доски
      deleteTaskInContext(cardId);
      toast.success("Задача успешно удалена!");
      navigate("/");
    } catch (err) {
      if (err.status === 401) {
        setError("Необходима авторизация");
        toast.error("Необходима авторизация");
        navigate("/login");
      } else if (err.status === 0) {
        const errorMsg = "Ошибка подключения к серверу. Проверьте интернет-соединение или попробуйте позже.";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMessage =
          err.data?.error ||
          err.data?.message ||
          err.message ||
          "Произошла ошибка при удалении задачи";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };


  if (isLoading) {
    return (
      <div className="pop-browse" id="popBrowse">
        <div className="pop-browse__container">
          <div className="pop-browse__block">
            <div className="pop-browse__content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "20px" }}>
              <div style={{
                width: "50px",
                height: "50px",
                border: "4px solid #eaeef6",
                borderTop: "4px solid #580ea2",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              <p>Загрузка...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
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
