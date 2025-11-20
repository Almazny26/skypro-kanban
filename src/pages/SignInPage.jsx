import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App.styled";
import { useState, useContext } from "react";
import { loginUser } from "../services/userApi";
import { AuthContext } from "../context/AuthContext";
import {
  Wrapper,
  ContainerSignin,
  Modal,
  ModalBlock,
  ModalTtl,
  ModalFormLogin,
  ModalInput,
  ModalFormGroup,
  ErrorMessage,
  ModalBtnEnter,
} from "./styled/SignInPage.styled";

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
