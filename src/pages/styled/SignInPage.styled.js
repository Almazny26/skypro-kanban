import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

export const ContainerSignin = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  @media screen and (max-width: 495px) {
    padding: 0;
    align-items: flex-start;
    padding-top: 0;
    width: 100%;
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 366px;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 12px;
  padding: 43px 47px 47px 40px;
  transition: background-color 0.3s ease;
  box-sizing: border-box;

  @media screen and (max-width: 495px) {
    padding: 43px 47px 47px 40px;
    border-radius: 12px;
    max-width: 366px;
    width: calc(100% - 40px);
    margin: 0 auto;
  }

  @media screen and (max-width: 375px) {
    padding: 30px 20px;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
`;

export const ModalBlock = styled.div`
  width: 100%;
`;

export const ModalTtl = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h2 {
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0%;
    text-align: center;
  }

  @media screen and (max-width: 375px) {
    margin-bottom: 20px;

    h2 {
      font-size: 26px;
      line-height: 32px;
    }
  }
`;

export const ModalFormLogin = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid
    ${(props) =>
      props.$hasError
        ? props.theme.error || "#ff0000"
        : props.theme.inputBorder || props.theme.border};
  padding: 8px 1px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: ${(props) => props.theme.text};
  background-color: transparent;
  transition: border-bottom-color 0.3s ease, color 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${(props) =>
      props.$hasError ? props.theme.error || "#ff0000" : props.theme.primary};
  }

  @media screen and (max-width: 375px) {
    font-size: 18px;
    padding: 8px 1px;
  }
`;

export const ModalFormGroup = styled.div`
  text-align: center;
  margin-top: 20px;

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: ${(props) => props.theme.text};
    margin-bottom: 10px;
  }

  a {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: ${(props) => props.theme.primary};
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.primaryHover};
    }
  }

  @media screen and (max-width: 375px) {
    margin-top: 20px;

    p {
      font-size: 18px;
    }

    a {
      font-size: 18px;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

export const ModalBtnEnter = styled.button`
  width: 100%;
  height: 52px;
  background-color: ${(props) =>
    props.disabled ? "#cccccc" : props.theme.primary};
  border-radius: 6px;
  border: none;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;
  transition: background-color 0.3s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-sizing: border-box;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.primaryHover};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }

  @media screen and (max-width: 375px) {
    height: 52px;
    font-size: 18px;
    margin-top: 20px;
  }
`;

