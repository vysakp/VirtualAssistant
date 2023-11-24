import React, { useState, useEffect } from "react";
import { CalenderHeader } from "./CalendarHeader";
import { Day } from "./Day";
import { DeleteEventModal } from "./DeleteEventModal";
import { NewEventModal } from "./NewEventModal";
import styleSheet from "./style.css";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Calendar = () => {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState("");
  const [events, setEvents] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getEvents", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            username: currentUser ? currentUser.uid : "abc",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setEvents(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const eventsForDate = (date) => events.find((e) => e.date === date);

  const handleAdd = async ({ title, date, user }) => {
    console.log(date);
    setTimeout(function () {
      console.log("Paused");
    }, 5000);
    const eventToAdd = {
      title: title,
      date: date,
      username: currentUser.uid,
    };
    try {
      const response = await fetch("http://localhost:3001/addEvent", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(eventToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      // handleAdd();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async ({ date }) => {
    console.log("Deleted");
    try {
      const response = await fetch("http://localhost:3001/deleteEvent", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ date: date, username: currentUser.uid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
    window.location.reload(false);
  };

  useEffect(() => {
    const dt = new Date();
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(
      `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    const daysArr = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventsForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: "",
        });
      }
    }
    setDays(daysArr);
  }, [events, nav]);

  if (!currentUser) return <Navigate replace to="/login" />;
  return (
    <div style={{ width: "100%" }}>
      <h1 id="heading" style={{ marginLeft: "15%", marginTop: "3%" }}>
        Calendar
      </h1>

      <div className="calendar_body">
        <div id="container">
          <CalenderHeader
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav + 1)}
            onBack={() => setNav(nav - 1)}
          />

          <div id="weekdays">
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>

          <div id="calendar">
            {days.map((d, index) => (
              <Day
                key={index}
                day={d}
                onClick={() => {
                  if (d.value !== "padding") {
                    setClicked(d.date);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {clicked && !eventsForDate(clicked) && (
          <NewEventModal
            onClose={() => setClicked(null)}
            onSave={(title) => {
              setEvents([
                ...events,
                { title, date: clicked, username: currentUser },
              ]);
              handleAdd({ title, date: clicked, username: currentUser });
              setClicked(null);
            }}
          />
        )}

        {clicked && eventsForDate(clicked) && (
          <DeleteEventModal
            eventText={eventsForDate(clicked).title}
            onClose={() => setClicked(null)}
            onDelete={() => {
              setEvents(events.filter((e) => e.date !== clicked));
              handleDelete({ date: clicked });
              setClicked(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Calendar;
