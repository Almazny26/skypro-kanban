// Импортируем useParams для получения параметров из URL и Link для навигации
import { useParams, Link } from "react-router-dom";
// Импортируем styled-components для стилизации
import styled from "styled-components";
// Импортируем глобальные стили
import { GlobalStyle } from "../App.styled";
// Импортируем данные карточек
import { cardsData } from "../data.js";

const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const CardBlock = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
`;

const CardTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000000;
`;

const CardInfo = styled.div`
  margin-bottom: 20px;
`;

const CardInfoItem = styled.p`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;
  color: #000000;

  strong {
    font-weight: 500;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #580ea2;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33399b;
  }
`;

// страница просмотра карточки
// получаем id из url через useParams
// например /card/5 -> id = "5"
function CardPage() {
  const { id } = useParams();

  // ищем карточку по id, parseInt нужен чтобы сравнить число с числом
  const card = cardsData.find((c) => c.id === parseInt(id));

  // если карточка не найдена
  if (!card) {
    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Container>
            <CardBlock>
              <CardTitle>Карточка не найдена</CardTitle>
              <BackLink to="/">Вернуться на главную</BackLink>
            </CardBlock>
          </Container>
        </Wrapper>
      </>
    );
  }

  // показываем информацию о карточке
  // id берется из url через useParams
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <CardBlock>
            <CardTitle>Просмотр карточки</CardTitle>
            <CardInfo>
              {/* id из url, например /card/5 -> показываем "ID карточки: 5" */}
              <CardInfoItem>
                <strong>ID карточки:</strong> {id}
              </CardInfoItem>
              <CardInfoItem>
                <strong>Название:</strong> {card.title}
              </CardInfoItem>
              <CardInfoItem>
                <strong>Категория:</strong> {card.topic}
              </CardInfoItem>
              <CardInfoItem>
                <strong>Статус:</strong> {card.status}
              </CardInfoItem>
              <CardInfoItem>
                <strong>Дата:</strong> {card.date}
              </CardInfoItem>
            </CardInfo>
            <BackLink to="/">Вернуться на главную</BackLink>
          </CardBlock>
        </Container>
      </Wrapper>
    </>
  );
}

export default CardPage;
