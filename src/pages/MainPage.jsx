import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopExit from "../components/PopExit/PopExit";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import { GlobalStyle, Wrapper } from "../App.styled";

// главная страница - доска с карточками
// вся логика страницы здесь
function MainPage({ onLogout }) {
  const location = useLocation();
  const { id } = useParams(); // получаем id карточки из роута /card/:id
  const [refreshKey, setRefreshKey] = useState(0);

  // функция для обновления списка задач
  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // определяем, какое модальное окно показывать на основе текущего роута
  const showNewCard = location.pathname === "/new-card";
  const showCard = location.pathname.startsWith("/card/");
  const showExit = location.pathname === "/exit";

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* модальные окна - показываются условно на основе роута */}
        {showExit && <PopExit onExit={onLogout} />}
        {showNewCard && <PopNewCard onTaskCreated={refreshTasks} />}
        {showCard && <PopBrowse cardId={id} onTaskUpdated={refreshTasks} />}

        <Header />
        <Main refreshKey={refreshKey} />
      </Wrapper>
    </>
  );
}

export default MainPage;
