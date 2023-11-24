import React from "react";

export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;
  return (
    <div className={className} onClick={onClick}>
      {day.value === "padding" ? "" : <div className="dayVal">{day.value}</div>}
      {day.event && <div className="event">{day.event.title}</div>}
    </div>
  );
};
