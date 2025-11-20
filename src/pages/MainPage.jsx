import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopExit from "../components/PopExit/PopExit";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import { GlobalStyle, Wrapper } from "../App.styled";

// Главная страница с Kanban доской
// Здесь определяю, какое модальное окно показывать в зависимости от URL
function MainPage() {
  const location = useLocation();
  const { id } = useParams(); // Получаю id карточки из URL /card/:id

  // Определяю, какое модальное окно нужно показать
  const showNewCard = location.pathname === "/new-card";
  const showCard = location.pathname.startsWith("/card/");
  const showExit = location.pathname === "/exit";

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* Модальные окна показываются в зависимости от текущего URL */}
        {showExit && <PopExit />}
        {showNewCard && <PopNewCard />}
        {showCard && <PopBrowse cardId={id} />}

        <Header />
        <Main />
      </Wrapper>
    </>
  );
}

export default MainPage;
