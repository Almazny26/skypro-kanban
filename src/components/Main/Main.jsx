import Column from '../Column/Column'

function Main() {
  const columns = [
    {
      title: "Без статуса",
      cards: [
        { title: "Название задачи", category: "Web Design", categoryClass: "_orange", date: "30.10.23" }
      ]
    },
    {
      title: "Нужно сделать", 
      cards: [
        { title: "Название задачи", category: "Research", categoryClass: "_green", date: "30.10.23" }
      ]
    },
    {
      title: "В работе",
      cards: [
        { title: "Название задачи", category: "Research", categoryClass: "_green", date: "30.10.23" }
      ]
    },
    {
      title: "Тестирование",
      cards: [
        { title: "Название задачи", category: "Research", categoryClass: "_green", date: "30.10.23" }
      ]
    },
    {
      title: "Готово",
      cards: [
        { title: "Название задачи", category: "Research", categoryClass: "_green", date: "30.10.23" }
      ]
    }
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column, index) => (
              <Column key={index} title={column.title} cards={column.cards} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;