import Card from "../Card/Card";
import { ColumnStyled, ColumnTitle, Cards } from "./Column.styled";

function Column({ title, cards = [] }) {
  return (
    <ColumnStyled>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <Cards>
        {cards.map((card, index) => (
          <Card key={card.id} delayMs={card.delayMs ?? index * 120} {...card} />
        ))}
      </Cards>
    </ColumnStyled>
  );
}

export default Column;
