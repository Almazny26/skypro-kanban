import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// Модальное окно подтверждения выхода из аккаунта
function PopExit() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Обработчик выхода - разлогиниваю пользователя и перехожу на страницу входа
  const handleExit = (e) => {
    e.preventDefault();
    logout(); // Разлогиниваю пользователя через контекст
    navigate("/login"); // Перехожу на страницу входа
  };

  return (
    <div className="pop-exit" id="popExit">
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <button
                className="pop-exit__exit-yes _hover01"
                id="exitYes"
                onClick={handleExit}
              >
                Да, выйти
              </button>
              <button className="pop-exit__exit-no _hover03" id="exitNo">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Нет, остаться
                </a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopExit;
