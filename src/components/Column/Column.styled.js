import styled from "styled-components";

export const ColumnStyled = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    display: block;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    color: ${(props) => props.theme?.textSecondary || "#94a6be"};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: block;
  position: relative;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    overflow-y: auto;
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
`;

