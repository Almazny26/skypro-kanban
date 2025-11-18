import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.background};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const Hover01 = styled.button`
  &:hover {
    background-color: #33399b;
  }
`;

export const Hover02 = styled.button`
  &:hover {
    color: #33399b;
  }

  &:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }
`;

export const Hover03 = styled.button`
  &:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  &:hover a {
    color: #ffffff;
  }
`;

export const OrangeTheme = styled.div`
  background-color: #ffe4c2;
  color: #ff6d00;
`;

export const GreenTheme = styled.div`
  background-color: #b4fdd1;
  color: #06b16e;
`;

export const PurpleTheme = styled.div`
  background-color: #e9d4ff;
  color: #9a48f1;
`;

export const GrayTheme = styled.div`
  background: #94a6be;
  color: #ffffff;
`;

