import React, { useState, useEffect } from "react";
import "./CalendarWidget.css";

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Fecha actual

  // Función para obtener el nombre del mes (en español)
  const getMonthName = (month) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
      "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[month];
  };

  // Función para obtener los días del mes
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Número de días en el mes
  };

  // Calcular el primer día de la semana del mes (para colocar los días correctamente)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay(); // Día de la semana (0: domingo, 1: lunes, etc.)
  };

  // Manejar la navegación entre meses
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // Incrementar o decrementar mes
    setCurrentDate(newDate);
  };

  // Calculamos el mes, año, y días
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const totalDays = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);

  // Generamos un array de días
  const daysArray = [...Array(totalDays)].map((_, i) => i + 1);

  return (
    <div className="calendar-widget">
      {/* Títulos y botones para navegar */}
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="nav-btn">&lt;</button>
        <h3>{getMonthName(month)} {year}</h3>
        <button onClick={() => changeMonth(1)} className="nav-btn">&gt;</button>
      </div>

      {/* Días de la semana */}
      <div className="calendar-days-header">
        <div>Dom</div><div>Lun</div><div>Mar</div><div>Mie</div><div>Jue</div><div>Vie</div><div>Sab</div>
      </div>

      {/* Días del mes */}
      <div className="calendar-days">
        {/* Espacios vacíos antes del primer día del mes */}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} className="empty"></div>
        ))}
        {daysArray.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
}

export default CalendarWidget;
