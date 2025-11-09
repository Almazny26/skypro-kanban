// Импортируем Link для навигации
import { Link } from "react-router-dom";
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

const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  text-align: center;
`;

const NotFoundBlock = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 60px 40px;
`;

const NotFoundTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000000;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #000000;
`;

const NotFoundText = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 40px;
  color: #000000;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: #580ea2;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33399b;
  }
`;

// страница 404
// показывается когда маршрут не найден
// маршрут "*" в AppRoutes перенаправляет сюда все несуществующие пути
function NotFoundPage() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <NotFoundBlock>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundSubtitle>Страница не найдена</NotFoundSubtitle>
            <NotFoundText>
              К сожалению, запрашиваемая страница не существует.
            </NotFoundText>
            <HomeLink to="/">Вернуться на главную</HomeLink>
          </NotFoundBlock>
        </Container>
      </Wrapper>
    </>
  );
}

export default NotFoundPage;
