// Импортируем компоненты для навигации и роутинга
import { Link, useNavigate } from "react-router-dom";
// Импортируем styled-components для стилизации
import styled from "styled-components";
// Импортируем глобальные стили
import { GlobalStyle } from "../App.styled";

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

const ContainerSignup = styled.div`
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

const ModalBtnSignupEnt = styled.button`
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

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
    text-decoration: none;
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

// страница регистрации
// после регистрации сразу авторизуемся
function SignUpPage({ onLogin }) {
  const navigate = useNavigate();

  // при отправке формы регистрируемся, авторизуемся и переходим на главную
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(); // меняет isAuth на true
      navigate("/");
    }
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
                />
                <ModalInput
                  type="text"
                  name="login"
                  id="loginReg"
                  placeholder="Эл. почта"
                />
                <ModalInput
                  type="password"
                  name="password"
                  id="passwordFirst"
                  placeholder="Пароль"
                />
                <ModalBtnSignupEnt type="submit" id="SignUpEnter">
                  Зарегистрироваться
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
