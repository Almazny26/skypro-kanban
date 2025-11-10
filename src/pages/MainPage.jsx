import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopExit from "../components/PopExit/PopExit";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import { GlobalStyle, Wrapper } from "../App.styled";

// главная страница - доска с карточками
// вся логика страницы здесь
function MainPage({ onLogout }) {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* модальные окна - скрыты по умолчанию, открываются через :target */}
        <PopExit onExit={onLogout} />
        <PopNewCard />
        <PopBrowse />

        <Header />
        <Main />
      </Wrapper>
    </>
  );
}

export default MainPage;
