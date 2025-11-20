import { GlobalStyle } from "../App.styled";
import {
  Wrapper,
  Container,
  NotFoundBlock,
  NotFoundTitle,
  NotFoundSubtitle,
  NotFoundText,
  HomeLink,
} from "./styled/NotFoundPage.styled";

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
