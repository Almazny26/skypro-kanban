import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../App.styled";
import { useState, useContext } from "react";
import { registerUser } from "../services/userApi";
import { AuthContext } from "../context/AuthContext";
import {
  Wrapper,
  ContainerSignup,
  Modal,
  ModalBlock,
  ModalTtl,
  ModalFormLogin,
  ModalInput,
  ModalFormGroup,
  ErrorMessage,
  ModalBtnSignupEnt,
} from "./styled/SignUpPage.styled";

// Страница регистрации нового пользователя
// После успешной регистрации автоматически авторизуемся
function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Проверяю, заполнены ли все поля - если да, кнопка станет активной
  const isFormValid = name.trim() && loginValue.trim() && password.trim();

  // Обработчик отправки формы - регистрируемся, авторизуемся и переходим на главную
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ name: false, login: false, password: false });

    // Проверяю, что все поля заполнены
    let hasErrors = false;
    const newFieldErrors = { name: false, login: false, password: false };

    if (!name.trim()) {
      newFieldErrors.name = true;
      hasErrors = true;
    }
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
      await registerUser(loginValue.trim(), name.trim(), password);
      login(); // Авторизуем пользователя через контекст
      navigate("/");
    } catch (err) {
      // Если что-то пошло не так, показываю ошибку пользователю
      if (err.status === 400) {
        const errorMessage =
          err.message || "Пользователь с таким логином уже существует";
        setError(errorMessage);
        setFieldErrors({ name: false, login: true, password: false });
      } else if (err.status === 0) {
        setError(
          err.message || "Ошибка сети. Проверьте подключение к интернету."
        );
      } else {
        setError(err.message || "Произошла ошибка при регистрации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (fieldErrors.name && e.target.value.trim()) {
      setFieldErrors((prev) => ({ ...prev, name: false }));
    }
    setError("");
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
        <ContainerSignup>
          <Modal>
            <ModalBlock>
              <ModalTtl>
                <h2>Регистрация</h2>
              </ModalTtl>
              <ModalFormLogin id="formLogUp" onSubmit={handleSubmit}>
                <ModalInput
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                  $hasError={fieldErrors.name}
                  required
                />
                <ModalInput
                  type="text"
                  name="login"
                  id="loginReg"
                  placeholder="Эл. почта"
                  value={loginValue}
                  onChange={handleLoginChange}
                  $hasError={fieldErrors.login}
                  required
                />
                <ModalInput
                  type="password"
                  name="password"
                  id="passwordFirst"
                  placeholder="Пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={fieldErrors.password}
                  required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ModalBtnSignupEnt
                  type="submit"
                  id="SignUpEnter"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </ModalBtnSignupEnt>
                <ModalFormGroup>
                  <p>
                    Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                  </p>
                </ModalFormGroup>
              </ModalFormLogin>
            </ModalBlock>
          </Modal>
        </ContainerSignup>
      </Wrapper>
    </>
  );
}

export default SignUpPage;
