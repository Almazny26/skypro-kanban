import { useState, useEffect } from "react";
import { ru } from "date-fns/locale";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from "date-fns";
import "./CalendarPicker.css";

// Компонент календаря с дизайном из макета
function CalendarContent({ selected, onDateSelect, currentMonth, onMonthChange }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Понедельник
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const monthName = format(currentMonth, "LLLL yyyy", { locale: ru });
  const monthNameFormatted = monthName.charAt(0).toLowerCase() + monthName.slice(1);

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    onMonthChange(newMonth);
  };

  const handleDayClick = (day) => {
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  return (
    <div className="calendar__block">
      <div className="calendar__nav">
        <div className="calendar__month">{monthNameFormatted}</div>
        <div className="nav__actions">
          <div className="nav__action" onClick={handlePrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
            </svg>
          </div>
          <div className="nav__action" onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="calendar__content">
        <div className="calendar__days-names">
          {weekDays.map((day, index) => (
            <div key={index} className={`calendar__day-name ${index >= 5 ? "-weekend-" : ""}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="calendar__cells">
          {days.map((day, index) => {
            const isOtherMonth = !isSameMonth(day, currentMonth);
            const isSelected = selected && isSameDay(day, selected);
            const isCurrentDay = isToday(day);
            const dayOfWeek = day.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={index}
                className={`calendar__cell ${
                  isOtherMonth ? "_other-month" : "_cell-day"
                } ${isWeekend ? "_weekend" : ""} ${isCurrentDay ? "_current" : ""} ${
                  isSelected ? "_active-day" : ""
                }`}
                onClick={() => !isOtherMonth && handleDayClick(day)}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
      <input type="hidden" id="datepick_value" value={selected ? format(selected, "dd.MM.yyyy") : ""} />
      <div className="calendar__period">
        <p className="calendar__p date-end">
          {selected ? (
            <>
              Выберите срок исполнения: <span className="date-control">{format(selected, "dd.MM.yy")}.</span>
            </>
          ) : (
            "Выберите срок исполнения"
          )}
        </p>
      </div>
    </div>
  );
}

function CalendarPicker({ selectedDate, onDateChange, isEditing = true }) {
  const [selected, setSelected] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return isNaN(date.getTime()) ? new Date() : date;
    }
    return new Date();
  });

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      if (!isNaN(date.getTime())) {
        setSelected(date);
        setCurrentMonth(date);
      }
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelected(date);
    if (onDateChange) {
      onDateChange(date.toISOString());
    }
  };

  if (!isEditing) {
    // В режиме просмотра просто показываем дату
    const date = selectedDate ? new Date(selectedDate) : new Date();
    return (
      <div className="calendar-view">
        <p className="calendar__p date-end">
          Срок исполнения:{" "}
          <span className="date-control">
            {format(date, "dd.MM.yy")}
          </span>
        </p>
      </div>
    );
  }

  return (
    <CalendarContent
      selected={selected}
      onDateSelect={handleDateSelect}
      currentMonth={currentMonth}
      onMonthChange={setCurrentMonth}
    />
  );
}

export default CalendarPicker;

