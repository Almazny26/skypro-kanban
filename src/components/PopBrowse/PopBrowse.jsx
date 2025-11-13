import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTaskById, updateTask, deleteTask } from "../../services/tasksApi";

function PopBrowse({ cardId, onTaskUpdated }) {
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
    try {
      setError("");
      const taskData = {
        title: title || "Новая задача",
        topic: topic || "Research",
        status: status || "Без статуса",
        description: description || "",
        date: date || new Date().toISOString(),
      };

      await updateTask(cardId, taskData);
      setIsEditing(false);
      await loadTask();
      // Обновляем список задач без перезагрузки страницы
      if (onTaskUpdated) {
        onTaskUpdated();
      }
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);
      if (err.status === 400) {
        setError("Неверные данные задачи");
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
      // Обновляем список задач без перезагрузки страницы
      if (onTaskUpdated) {
        onTaskUpdated();
      }
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
                <h3 className="pop-browse__ttl">{task?.title || "Название задачи"}</h3>
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
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #d0cece",
                    fontSize: "16px",
                  }}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
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
                <div className="calendar__block">
                  <div className="calendar__nav">
                    <div className="calendar__month">Сентябрь 2023</div>
                    <div className="nav__actions">
                      <div className="nav__action" data-action="prev">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                        </svg>
                      </div>
                      <div className="nav__action" data-action="next">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="calendar__content">
                    <div className="calendar__days-names">
                      <div className="calendar__day-name">пн</div>
                      <div className="calendar__day-name">вт</div>
                      <div className="calendar__day-name">ср</div>
                      <div className="calendar__day-name">чт</div>
                      <div className="calendar__day-name">пт</div>
                      <div className="calendar__day-name -weekend-">сб</div>
                      <div className="calendar__day-name -weekend-">вс</div>
                    </div>
                    <div className="calendar__cells">
                      <div className="calendar__cell _other-month">28</div>
                      <div className="calendar__cell _other-month">29</div>
                      <div className="calendar__cell _other-month">30</div>
                      <div className="calendar__cell _cell-day">31</div>
                      <div className="calendar__cell _cell-day">1</div>
                      <div className="calendar__cell _cell-day _weekend">2</div>
                      <div className="calendar__cell _cell-day _weekend">3</div>
                      <div className="calendar__cell _cell-day">4</div>
                      <div className="calendar__cell _cell-day">5</div>
                      <div className="calendar__cell _cell-day ">6</div>
                      <div className="calendar__cell _cell-day">7</div>
                      <div className="calendar__cell _cell-day _current">8</div>
                      <div className="calendar__cell _cell-day _weekend _active-day">
                        9
                      </div>
                      <div className="calendar__cell _cell-day _weekend">
                        10
                      </div>
                      <div className="calendar__cell _cell-day">11</div>
                      <div className="calendar__cell _cell-day">12</div>
                      <div className="calendar__cell _cell-day">13</div>
                      <div className="calendar__cell _cell-day">14</div>
                      <div className="calendar__cell _cell-day">15</div>
                      <div className="calendar__cell _cell-day _weekend">
                        16
                      </div>
                      <div className="calendar__cell _cell-day _weekend">
                        17
                      </div>
                      <div className="calendar__cell _cell-day">18</div>
                      <div className="calendar__cell _cell-day">19</div>
                      <div className="calendar__cell _cell-day">20</div>
                      <div className="calendar__cell _cell-day">21</div>
                      <div className="calendar__cell _cell-day">22</div>
                      <div className="calendar__cell _cell-day _weekend">
                        23
                      </div>
                      <div className="calendar__cell _cell-day _weekend">
                        24
                      </div>
                      <div className="calendar__cell _cell-day">25</div>
                      <div className="calendar__cell _cell-day">26</div>
                      <div className="calendar__cell _cell-day">27</div>
                      <div className="calendar__cell _cell-day">28</div>
                      <div className="calendar__cell _cell-day">29</div>
                      <div className="calendar__cell _cell-day _weekend">
                        30
                      </div>
                      <div className="calendar__cell _other-month _weekend">
                        1
                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="datepick_value" value="08.09.2023" />
                  <div className="calendar__period">
                    <p className="calendar__p date-end">
                      Срок исполнения:{" "}
                      <span className="date-control">
                        {formatDate(date)}
                      </span>
                    </p>
                  </div>
                </div>
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
              <div style={{ color: "#ff0000", marginTop: "10px", textAlign: "center" }}>
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
