import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "../App.styled";
import { useState, useContext } from "react";
import { loginUser } from "../services/userApi";
import { AuthContext } from "../context/AuthContext";

const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
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
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  padding: 43px 47px 47px 40px;
  transition: background-color 0.3s ease;
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
  border-bottom: 1px solid
    ${(props) =>
      props.$hasError
        ? props.theme.error || "#ff0000"
        : props.theme.inputBorder || props.theme.border};
  padding: 8px 1px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: ${(props) => props.theme.text};
  background-color: transparent;
  transition: border-bottom-color 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${(props) =>
      props.$hasError ? props.theme.error || "#ff0000" : props.theme.primary};
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
    color: ${(props) => props.theme.text};
    margin-bottom: 10px;
  }

  a {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: ${(props) => props.theme.primary};
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.primaryHover};
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
  background-color: ${(props) =>
    props.disabled ? "#cccccc" : props.theme.primary};
  border-radius: 6px;
  border: none;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;
  transition: background-color 0.3s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.primaryHover};
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

// Страница входа в систему
function SignInPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    login: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Проверяю, заполнены ли все поля - если да, кнопка станет активной
  const isFormValid = loginValue.trim() && password.trim();

  // Обработчик отправки формы - авторизуемся и переходим на главную
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ login: false, password: false });

    // Проверяю, что все поля заполнены
    let hasErrors = false;
    const newFieldErrors = { login: false, password: false };

    if (!loginValue.trim()) {
      newFieldErrors.login = true;
      hasErrors = true;
    }
    if (!password.trim()) {
      newFieldErrors.password = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      setError("Заполните все обязательные поля");
      return;
    }

    setIsLoading(true);

    try {
      await loginUser(loginValue.trim(), password);
      login(); // Авторизуем пользователя через контекст
      navigate("/"); // Переходим на главную страницу
    } catch (err) {
      // Если что-то пошло не так, показываю ошибку пользователю
      if (err.status === 400) {
        const errorMessage = err.message || "Неверный логин или пароль";
        setError(errorMessage);
        setFieldErrors({ login: true, password: true });
      } else if (err.status === 0) {
        setError(
          err.message || "Ошибка сети. Проверьте подключение к интернету."
        );
      } else {
        setError(err.message || "Произошла ошибка при авторизации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
    if (fieldErrors.login && e.target.value.trim()) {
      setFieldErrors((prev) => ({ ...prev, login: false }));
    }
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (fieldErrors.password && e.target.value.trim()) {
      setFieldErrors((prev) => ({ ...prev, password: false }));
    }
    setError("");
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
                  value={loginValue}
                  onChange={handleLoginChange}
                  $hasError={fieldErrors.login}
                  required
                />
                <ModalInput
                  type="password"
                  name="password"
                  id="formpassword"
                  placeholder="Пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={fieldErrors.password}
                  required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ModalBtnEnter
                  type="submit"
                  id="btnEnter"
                  disabled={!isFormValid || isLoading}
                >
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
