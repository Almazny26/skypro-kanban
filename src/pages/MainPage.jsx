import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { GlobalStyle, Wrapper } from "../App.styled";

// главная страница - доска с карточками
// вся логика страницы здесь
function MainPage() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </>
  );
}

export default MainPage;
