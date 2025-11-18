import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "../Card/Card";
import { ColumnStyled, ColumnTitle, Cards, DropIndicator } from "./Column.styled";

function Column({ id, title, cards = [], activeId, overId }) {
  const columnId = id || title;
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  const cardIds = useMemo(() => cards.map((card) => card.id), [cards]);

  // Определяю, нужно ли показывать индикаторы места для вставки карточки
  const isDragging = activeId !== null;
  const isOverColumn = isOver && activeId && !cardIds.includes(activeId);
  const isOverCard = overId && cardIds.includes(overId);
  const isOverColumnDirectly = isOver && overId === columnId;
  
  // Определяю, над какой карточкой сейчас перетаскиваем
  const overCardIndex = isOverCard ? cards.findIndex(card => card.id === overId) : -1;
  
  // Показываю индикаторы внизу колонки, если перетаскиваем карточку из другой колонки
  const showIndicatorsEverywhere = isDragging && activeId && !cardIds.includes(activeId);

  return (
    <ColumnStyled>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <Cards 
        ref={setNodeRef}
        data-column-id={columnId}
        $isOverColumn={isOverColumn}
      >
        <SortableContext 
          items={cardIds} 
          strategy={verticalListSortingStrategy}
          id={columnId}
        >
          {cards.map((card, index) => (
            <Card 
              key={card.id}
              id={card.id}
              delayMs={card.delayMs ?? index * 120} 
              {...card} 
            />
                 ))}
                 {/* Показываю индикатор места для вставки только внизу колонки */}
                 {showIndicatorsEverywhere && (
                   <DropIndicator $position="after" />
                 )}
        </SortableContext>
      </Cards>
    </ColumnStyled>
  );
}

export default Column;
