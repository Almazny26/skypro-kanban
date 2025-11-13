import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../App.styled";
import {
  HeaderStyled,
  HeaderBlock,
  Logo,
  Nav,
  ButtonMainNew,
  UserButton,
  PopUserSet,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  PopUserButton,
} from "./Header.styled";

// шапка сайта
// использует Link для навигации без перезагрузки
function Header() {
  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <HeaderStyled>
      <Container>
        <HeaderBlock>
          <Logo className="_show _light">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </Logo>
          <Logo className="_dark">
            <Link to="/">
              <img src="/images/logo_dark.png" alt="logo" />
            </Link>
          </Logo>
          <Nav>
            <ButtonMainNew id="btnMainNew">
              <Link to="/new-card">Создать новую задачу</Link>
            </ButtonMainNew>
            <UserButton type="button" onClick={() => setIsUserOpen((v) => !v)}>
              Ivan Ivanov
            </UserButton>
            {/* меню показывается когда isUserOpen === true */}
            <PopUserSet $isOpen={isUserOpen} id="user-set-target">
              <PopUserName>Ivan Ivanov</PopUserName>
              <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
              <PopUserTheme>
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
              </PopUserTheme>
                  <PopUserButton type="button">
                    <Link to="/exit">Выйти</Link>
                  </PopUserButton>
            </PopUserSet>
          </Nav>
        </HeaderBlock>
      </Container>
    </HeaderStyled>
  );
}

export default Header;
