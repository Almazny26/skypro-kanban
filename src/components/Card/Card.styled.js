import styled, { keyframes } from "styled-components";

const cardAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardItem = styled.div`
  padding: 5px;
  animation: ${cardAnimation} 500ms linear both;
  overflow: visible;
  animation-delay: ${(props) => props.$delayMs || 0}ms;
  position: relative;
  z-index: ${(props) => (props.$isDragging ? 1000 : 1)};
`;

export const CardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${(props) => props.theme?.cardBackground || "#ffffff"};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
    background-color: ${(props) => props.theme?.cardBackground || "#ffffff"};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BaseTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const CardThemeOrange = styled(BaseTheme)`
  background-color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#FFB366" : "#ffe4c2";
  }};
  color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#FF6D00" : "#ff6d00";
  }};
`;

export const CardThemeGreen = styled(BaseTheme)`
  background-color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#6FCF97" : "#b4fdd1";
  }};
  color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#00A86B" : "#06b16e";
  }};
`;

export const CardThemePurple = styled(BaseTheme)`
  background-color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#C896FF" : "#e9d4ff";
  }};
  color: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    return isDark ? "#7B2CBF" : "#9a48f1";
  }};
`;

export const CardThemeGray = styled(BaseTheme)`
  background: #94a6be;
  color: #ffffff;
`;

export const cardThemes = {
  _orange: CardThemeOrange,
  _green: CardThemeGreen,
  _purple: CardThemePurple,
  _gray: CardThemeGray,
};

export const CardBtn = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
  }
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${(props) => props.theme?.text || "#000000"};
  margin-bottom: 10px;
  transition: color 0.3s ease;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${(props) => props.theme?.textSecondary || "#94a6be"};
    letter-spacing: 0.2px;
    transition: color 0.3s ease;
  }
`;
