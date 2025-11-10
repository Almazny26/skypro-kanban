import { useNavigate } from "react-router-dom";

// модальное окно подтверждения выхода
// onExit - функция из AppRoutes, меняет isAuth на false
function PopExit({ onExit }) {
  const navigate = useNavigate();

  // обработчик выхода
  const handleExit = (e) => {
    e.preventDefault();
    if (onExit) {
      onExit(); // меняет isAuth на false
      navigate("/login"); // переход на страницу входа
    }
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
                    window.location.hash = "";
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
