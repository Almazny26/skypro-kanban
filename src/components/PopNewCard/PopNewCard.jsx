import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { createTask } from "../../services/tasksApi";
import CalendarPicker from "../Calendar/CalendarPicker";
import { TaskContext } from "../../context/TaskContext";
import { toast } from "react-toastify";

function PopNewCard() {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Web Design");
  const [date, setDate] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Обработчик создания новой задачи
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    // Проверяю, что все обязательные поля заполнены
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
    // Проверяю, что дата валидна
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

      const response = await createTask(taskData);
      // API возвращает обновленный список всех задач, нахожу среди них новую
      if (response && response.length > 0) {
        // Ищу задачу с такими же данными, как только что созданная
        const newTask = response.find(
          (task) =>
            task.title === taskData.title &&
            task.topic === taskData.topic &&
            task.status === taskData.status
        );
        if (newTask) {
          addTask(newTask);
        }
      }
      toast.success("Задача успешно создана!");
      navigate("/");
    } catch (err) {
      if (err.status === 400) {
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
        const errorMsg = err.message || "Произошла ошибка при создании задачи";
        setError(errorMsg);
        toast.error(errorMsg);
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
