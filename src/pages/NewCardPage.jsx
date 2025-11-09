// Импортируем Link для навигации
import { Link } from "react-router-dom";
// Импортируем styled-components для стилизации
import styled from "styled-components";
// Импортируем глобальные стили
import { GlobalStyle } from "../App.styled";

const Wrapper = styled.div`
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

const CardBlock = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
`;

const CardTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;

  &:focus {
    outline: none;
    border-color: #580ea2;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #580ea2;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SubmitButton = styled(Button)`
  background-color: #580ea2;
  color: #ffffff;

  &:hover {
    background-color: #33399b;
  }
`;

const CancelButton = styled(Link)`
  padding: 12px 24px;
  background-color: #f1f1f1;
  color: #000000;
  text-decoration: none;
  border-radius: 6px;
  display: inline-block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// страница создания новой задачи
function NewCardPage() {
  // обработчик формы
  // пока просто заглушка, потом добавим логику
  const handleSubmit = (e) => {
    e.preventDefault();
    // тут будет создание карточки
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <CardBlock>
            <CardTitle>Создание задачи</CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Название задачи</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Введите название задачи..."
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Описание задачи</Label>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Введите описание задачи..."
                />
              </FormGroup>
              <ButtonGroup>
                <SubmitButton type="submit">Создать задачу</SubmitButton>
                <CancelButton to="/">Отмена</CancelButton>
              </ButtonGroup>
            </Form>
          </CardBlock>
        </Container>
      </Wrapper>
    </>
  );
}

export default NewCardPage;
