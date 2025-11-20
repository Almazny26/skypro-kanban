import styled, { keyframes, css } from "styled-components";

const popUserAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.cardBackground};
  transition: background-color 0.3s ease;
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;

  @media screen and (max-width: 768px) {
    padding: 0 5px;
  }

  @media screen and (max-width: 495px) {
    height: 60px;
  }
`;

export const Logo = styled.div`
  img {
    width: 85px;
  }

  @media screen and (max-width: 495px) {
    img {
      width: 70px;
    }
  }
`;

export const Nav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 495px) {
    max-width: auto;
    flex: 1;
    justify-content: flex-end;
  }
`;

export const ButtonMainNew = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    font-size: 13px;
    margin-right: 10px;
  }

  @media screen and (max-width: 495px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
    font-size: 14px;
  }
`;

export const UserButton = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
  background: transparent;
  border: none;
  padding: 0;

  &:hover {
    color: #33399b;
  }

  &:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }
`;

export const PopUserSet = styled.div`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  top: 50px;
  right: 0;
  width: 213px;
  min-height: auto;
  border-radius: 10px;
  border: 0.7px solid ${(props) => props.theme.inputBorder || "rgba(148, 166, 190, 0.4)"};
  background: ${(props) => props.theme.cardBackground};
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 10;
  transform: translateX(0);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  box-sizing: border-box;

  ${(props) =>
    props.$isOpen &&
    css`
      animation: ${popUserAppear} 500ms ease both;
    `}

  @media screen and (max-width: 768px) {
    width: 213px;
    right: 0;
    padding: 24px;
  }

  @media screen and (max-width: 495px) {
    width: 213px;
    max-width: calc(100vw - 32px);
    right: 0;
    left: auto;
    padding: 20px;
    min-height: auto;
    top: 50px;
  }
`;

export const PopUserName = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
  transition: color 0.3s ease;
  word-break: break-word;
  overflow-wrap: break-word;

  @media screen and (max-width: 495px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const PopUserMail = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
  transition: color 0.3s ease;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  @media screen and (max-width: 495px) {
    font-size: 14px;
    margin-bottom: 10px;
    word-break: break-word;
    white-space: normal;
  }
`;

export const PopUserTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  gap: 10px;

  p {
    color: ${(props) => props.theme.text};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    transition: color 0.3s ease;
    margin: 0;
    flex: 1;
    text-align: left;
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 13px;
    min-width: 24px;
    border-radius: 100px;
    background: #eaeef6;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    flex-shrink: 0;
    margin: 0;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94a6be;
    transition: 0.5s;
  }

  input:checked[type="checkbox"] {
    background: #565eef;
  }

  input:checked[type="checkbox"]::before {
    left: 12px;
    background-color: #ffffff;
  }

  @media screen and (max-width: 495px) {
    margin-bottom: 20px;
    gap: 10px;
    
    p {
      font-size: 14px;
      line-height: 21px;
    }

    input[type="checkbox"] {
      width: 24px;
      height: 13px;
      min-width: 24px;
    }

    input[type="checkbox"]::before {
      width: 11px;
      height: 11px;
    }
  }
`;

export const PopUserButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;

  &:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  &:hover a {
    color: #ffffff;
  }

  a {
    color: #565eef;
  }
`;

