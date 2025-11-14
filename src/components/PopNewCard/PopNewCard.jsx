import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../../services/tasksApi";
import CalendarPicker from "../Calendar/CalendarPicker";

function PopNewCard({ onTaskCreated }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Web Design");
  const [date, setDate] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    // Валидация полей перед отправкой
    if (!title || !title.trim()) {
      setError("Пожалуйста, заполните все обязательные поля. Введите название задачи.");
      return;
    }
    if (!topic || !topic.trim()) {
      setError("Пожалуйста, заполните все обязательные поля. Выберите категорию.");
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

    setIsLoading(true);

    try {
      const taskData = {
        title: title.trim(),
        topic: topic.trim(),
        status: "Без статуса",
        description: description ? description.trim() : "",
        date: date,
      };

      await createTask(taskData);
      // Обновляем список задач без перезагрузки страницы
      if (onTaskCreated) {
        onTaskCreated();
      }
      navigate("/");
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
      if (err.status === 400) {
        setError("Неверные данные задачи");
      } else if (err.status === 401) {
        setError("Необходима авторизация");
        navigate("/login");
      } else {
        setError(err.message || "Произошла ошибка при создании задачи");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = (selectedTopic) => {
    setTopic(selectedTopic);
  };

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a
              href="#"
              className="pop-new-card__close"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              &#10006;
            </a>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                action="#"
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="text"
                    id="textArea"
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
                  isEditing={true}
                />
              </div>
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${
                    topic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicClick("Web Design")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div
                  className={`categories__theme _green ${
                    topic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicClick("Research")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_green">Research</p>
                </div>
                <div
                  className={`categories__theme _purple ${
                    topic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicClick("Copywriting")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? "Создание..." : "Создать задачу"}
            </button>
            {error && (
              <div style={{ color: "#ff0000", marginTop: "10px", textAlign: "center" }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopNewCard;
