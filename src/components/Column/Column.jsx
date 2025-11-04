import Card from "../Card/Card";

function Column({ title, cards = [] }) {
  return (
    <div className="main__column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={card.id} delayMs={card.delayMs ?? index * 120} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Column;
