import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonCardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${(props) => props.theme?.cardBackground || "#ffffff"};
  border-radius: 10px;
  padding: 15px 13px 19px;
  margin: 5px;
  animation: ${(props) => {
    const delay = props.$delayMs || 0;
    return `fadeIn 500ms linear both ${delay}ms`;
  }};
  position: relative;
  overflow: hidden;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SkeletonContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SkeletonCategory = styled.div`
  width: 82px;
  height: 20px;
  border-radius: 18px;
  background: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    if (isDark) {
      return "linear-gradient(90deg, rgba(71, 91, 119, 1) 0%, rgba(148, 166, 190, 1) 46%, rgba(71, 91, 119, 1) 97%)";
    }
    return "linear-gradient(90deg, rgba(71, 91, 119, 1) 0%, rgba(148, 166, 190, 1) 46%, rgba(71, 91, 119, 1) 97%)";
  }};
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonLine = styled.div`
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "13px"};
  border-radius: 4px;
  background: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    if (isDark) {
      return "linear-gradient(90deg, rgba(193, 205, 220, 1) 0%, rgba(233, 238, 247, 1) 47%, rgba(193, 205, 220, 1) 100%)";
    }
    return "linear-gradient(90deg, rgba(193, 205, 220, 1) 0%, rgba(233, 238, 247, 1) 47%, rgba(193, 205, 220, 1) 100%)";
  }};
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonDate = styled.div`
  width: 58px;
  height: 13px;
  border-radius: 4px;
  background: ${(props) => {
    const isDark = props.theme?.background === "#151419";
    if (isDark) {
      return "linear-gradient(90deg, rgba(193, 205, 220, 1) 0%, rgba(233, 238, 247, 1) 47%, rgba(193, 205, 220, 1) 100%)";
    }
    return "linear-gradient(90deg, rgba(193, 205, 220, 1) 0%, rgba(233, 238, 247, 1) 47%, rgba(193, 205, 220, 1) 100%)";
  }};
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

