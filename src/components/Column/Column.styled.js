import styled from "styled-components";

export const ColumnStyled = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto 30px;
    display: block;
    position: relative;
  }

  @media screen and (max-width: 495px) {
    margin-bottom: 20px;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;
  position: relative;
  z-index: 1;

  p {
    color: ${(props) => props.theme?.textSecondary || "#94a6be"};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  @media screen and (max-width: 1200px) {
    padding: 0 16px;
    margin: 12px 0;
    position: sticky;
    top: 0;
    background-color: ${(props) => props.theme?.mainBackground || "#f4f6f8"};
    z-index: 2;
  }

  @media screen and (max-width: 768px) {
    padding: 0 16px;
    margin: 12px 0;

    p {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 495px) {
    padding: 0 16px;
    margin: 10px 0;

    p {
      font-size: 12px;
    }
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: block;
  position: relative;
  min-height: ${(props) => (props.$isOverColumn ? "200px" : "auto")};
  background-color: ${(props) => (props.$isOverColumn ? "rgba(88, 14, 162, 0.05)" : "transparent")};
  border-radius: ${(props) => (props.$isOverColumn ? "8px" : "0")};
  transition: all 0.2s ease;
  padding: ${(props) => (props.$isOverColumn ? "10px 0" : "0")};

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 10px;
    padding: ${(props) => (props.$isOverColumn ? "10px 0 10px" : "0 0 10px")};
    margin: 0;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    touch-action: pan-x;
    scrollbar-width: thin;
    scrollbar-color: #94a6be transparent;
    min-height: ${(props) => (props.$isOverColumn ? "200px" : "180px")};
    background-color: ${(props) => (props.$isOverColumn ? "rgba(88, 14, 162, 0.05)" : "transparent")};
    border-radius: ${(props) => (props.$isOverColumn ? "8px" : "0")};
    padding-left: 16px;
    padding-right: 16px;
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
    position: relative;
    will-change: scroll-position;

    /* Увеличиваю область для прокрутки */
    & > * {
      flex-shrink: 0;
    }

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #94a6be;
      border-radius: 3px;
    }
  }

  @media screen and (max-width: 495px) {
    gap: 8px;
    padding: ${(props) => (props.$isOverColumn ? "10px 16px 8px" : "0 16px 8px")};
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }
`;

export const DropIndicator = styled.div`
  width: 220px;
  height: 130px;
  background: none;
  border: 2px dashed ${(props) => props.theme?.primary || "#565EEF"};
  border-radius: 10px;
  margin: ${(props) => {
    if (props.$position === "before") return "5px 0";
    if (props.$position === "after") return "5px 0";
    if (props.$position === "end") return "10px 0";
    return "0";
  }};
  opacity: 0.8;
  animation: ${(props) => {
    if (props.$position) {
      return "pulse 1.5s ease-in-out infinite";
    }
    return "none";
  }};
  box-sizing: border-box;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    width: 200px;
    height: 120px;
  }

  @media screen and (max-width: 495px) {
    width: 180px;
    height: 110px;
  }
`;

