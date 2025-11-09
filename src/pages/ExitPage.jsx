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
  padding: 20px;
`;

const ContainerExit = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 30px;
  text-align: center;

  h2 {
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0%;
    color: #000000;
  }
`;

const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 6px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.05px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ExitYes = styled(Button)`
  background-color: #580ea2;
  color: #ffffff;

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const ExitNo = styled(Button)`
  background-color: transparent;
  border: 1px solid #d0cece;
  color: #000000;

  &:hover {
    background-color: #f1f1f1;
  }

  a {
    color: #000000;
    text-decoration: none;
  }
`;

// страница выхода
// onExit - функция из AppRoutes, меняет isAuth на false
function ExitPage({ onExit }) {
  const navigate = useNavigate();

  // при выходе меняем isAuth на false и переходим на логин
  const handleExit = (e) => {
    e.preventDefault();
    if (onExit) {
      onExit(); // меняет isAuth на false
      navigate("/login");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContainerExit>
          <Modal>
            <ModalBlock>
              <ModalTtl>
                <h2>Выйти из аккаунта?</h2>
              </ModalTtl>
              <ModalForm id="formExit" onSubmit={handleExit}>
                <ModalFormGroup>
                  <ExitYes type="submit" id="exitYes" onClick={handleExit}>
                    Да, выйти
                  </ExitYes>
                  <ExitNo type="button" id="exitNo">
                    <Link to="/">Нет, остаться</Link>
                  </ExitNo>
                </ModalFormGroup>
              </ModalForm>
            </ModalBlock>
          </Modal>
        </ContainerExit>
      </Wrapper>
    </>
  );
}

export default ExitPage;
