// Импортируем компоненты для навигации и роутинга
import { Link, useNavigate } from "react-router-dom";
// Импортируем styled-components для стилизации
import styled from "styled-components";
// Импортируем глобальные стили
import { GlobalStyle } from "../App.styled";
// Импортируем useState для управления состоянием
import { useState } from "react";
// Импортируем API для авторизации
import { loginUser } from "../services/userApi";

const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerSignin = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 366px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 43px 47px 47px 40px;
`;

const ModalBlock = styled.div`
  width: 100%;
`;

const ModalTtl = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0%;
    text-align: left;
  }
`;

const ModalFormLogin = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;

  &::placeholder {
    color: #d0cece;
  }

  &:focus {
    outline: none;
    border-bottom-color: #33399b;
  }
`;


const ModalFormGroup = styled.div`
  text-align: center;
  margin-top: 20px;

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #000000;
    margin-bottom: 10px;
  }

  a {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #580ea2;
    text-decoration: underline;

    &:hover {
      color: #33399b;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const ModalBtnEnter = styled.button`
  width: 100%;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  border: none;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

// страница входа
// onLogin - функция из AppRoutes, меняет isAuth на true
function SignInPage({ onLogin }) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // при отправке формы авторизуемся и переходим на главную
  const handleSubmit = async (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась
    setError("");
    
    // Валидация полей
    if (!login.trim()) {
      setError("Введите логин");
      return;
    }
    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }
    
    setIsLoading(true);

    try {
      await loginUser(login.trim(), password);
      if (onLogin) {
        onLogin(); // меняет isAuth на true
        navigate("/"); // переход на главную
      }
    } catch (err) {
      // Обрабатываем ошибки
      console.error("Ошибка авторизации:", err);
      if (err.status === 400) {
        setError(err.message || "Неверный логин или пароль");
      } else if (err.status === 0) {
        setError(err.message || "Ошибка сети. Проверьте подключение к интернету.");
      } else {
        setError(err.message || "Произошла ошибка при авторизации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContainerSignin>
          <Modal>
            <ModalBlock>
              <ModalTtl>
                <h2>Вход</h2>
              </ModalTtl>
              <ModalFormLogin id="formLogIn" onSubmit={handleSubmit}>
                <ModalInput
                  type="text"
                  name="login"
                  id="formlogin"
                  placeholder="Эл. почта"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
                <ModalInput
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ModalBtnEnter type="submit" id="btnEnter" disabled={isLoading}>
                  {isLoading ? "Вход..." : "Войти"}
                </ModalBtnEnter>
                <ModalFormGroup>
                  <p>Нужно зарегистрироваться?</p>
                  <Link to="/register">Регистрируйтесь здесь</Link>
                </ModalFormGroup>
              </ModalFormLogin>
            </ModalBlock>
          </Modal>
        </ContainerSignin>
      </Wrapper>
    </>
  );
}

export default SignInPage;
