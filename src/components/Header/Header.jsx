import { useState, useContext } from "react";
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
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

// Компонент шапки сайта с навигацией и меню пользователя
function Header() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { userName, userLogin } = useContext(AuthContext);

  return (
    <HeaderStyled>
      <Container>
        <HeaderBlock>
          <Logo>
            <Link to="/">
              <img
                src={isDark ? "/images/logo_dark.png" : "/images/logo.png"}
                alt="logo"
              />
            </Link>
          </Logo>
          <Nav>
            <ButtonMainNew id="btnMainNew">
              <Link to="/new-card">Создать новую задачу</Link>
            </ButtonMainNew>
            <UserButton type="button" onClick={() => setIsUserOpen((v) => !v)}>
              {userName || "Пользователь"}
            </UserButton>
            {/* Меню пользователя показывается при клике на кнопку */}
            <PopUserSet $isOpen={isUserOpen} id="user-set-target">
              <PopUserName>{userName || "Пользователь"}</PopUserName>
              <PopUserMail>{userLogin || ""}</PopUserMail>
              <PopUserTheme>
                <p>Темная тема</p>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="checkbox"
                  checked={isDark}
                  onChange={toggleTheme}
                />
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
