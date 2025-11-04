import { useEffect, useMemo, useState } from "react";
import Column from "../Column/Column";
import { cardsData } from "../../data.js";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCards(cardsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  const columns = useMemo(() => {
    const statusTitles = [
      "Без статуса",
      "Нужно сделать",
      "В работе",
      "Тестирование",
      "Готово",
    ];

    const topicToClass = {
      "Web Design": "_orange",
      Research: "_green",
      Copywriting: "_purple",
      Testing: "_gray",
      Deploy: "_green",
    };

    let globalIndex = 0;
    const delayStepMs = 120;

    return statusTitles.map((statusTitle) => {
      const cardsForColumn = cards
        .filter((c) => c.status === statusTitle)
        .map((c) => ({
          id: c.id,
          title: c.title,
          category: c.topic,
          categoryClass: topicToClass[c.topic] || "_gray",
          date: c.date,
          delayMs: globalIndex++ * delayStepMs,
        }));
      return {
        title: statusTitle,
        cards: cardsForColumn,
      };
    });
  }, [cards]);

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {isLoading ? (
              <div className="loading">Данные загружаются</div>
            ) : (
              columns.map((column) => (
                <Column
                  key={column.title}
                  title={column.title}
                  cards={column.cards}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
