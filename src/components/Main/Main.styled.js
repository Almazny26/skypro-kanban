import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.mainBackground};
  transition: background-color 0.3s ease;
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 40px 0 64px;
  }

  @media screen and (max-width: 768px) {
    padding: 30px 0 50px;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 0 100px;
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 16px;
  gap: 20px;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #eaeef6;
  border-top: 4px solid #580ea2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 18px;
  font-weight: 500;
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export const SkeletonColumn = styled.div`
  width: 20%;
  margin: 0 auto;
  display: block;

  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto 30px;
    display: block;
  }

  @media screen and (max-width: 495px) {
    margin-bottom: 20px;
  }
`;

export const SkeletonColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  @media screen and (max-width: 1200px) {
    padding: 0 16px;
    margin: 12px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 0 16px;
    margin: 12px 0;
  }

  @media screen and (max-width: 495px) {
    padding: 0 16px;
    margin: 10px 0;
  }
`;

export const SkeletonCards = styled.div`
  width: 100%;
  display: block;
  position: relative;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 10px;
    padding: 0 16px 10px;
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    touch-action: pan-x;
    scrollbar-width: thin;
    scrollbar-color: #94a6be transparent;
    min-height: 150px;

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
    padding: 0 16px 8px;
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
  }
`;

