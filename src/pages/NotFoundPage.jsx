import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "../App.styled";

const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: background-color 0.3s ease;
`;

const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  text-align: center;
`;

const NotFoundBlock = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  padding: 60px 40px;
  transition: background-color 0.3s ease;
`;

const NotFoundTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  transition: color 0.3s ease;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  color: ${(props) => props.theme.text};
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  transition: color 0.3s ease;
`;

const NotFoundText = styled.p`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.text};
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  transition: color 0.3s ease;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.05px;
  transition: background-color 0.3s;
  font-family: "Roboto", Arial, Helvetica, sans-serif;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

// Страница 404 - показывается когда пользователь переходит на несуществующий маршрут
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
