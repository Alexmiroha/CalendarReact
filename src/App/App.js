import React, {useState, useEffect} from "../../snowpack/pkg/react.js";
import {CalendarHeader} from "./Components/CalendarHeader/CalendarHeader.js";
import {Day} from "./Components/Day/Day.js";
import {NewEventModal} from "./Components/NewEventModal/NewEventModal.js";
import {DeleteEventModal} from "./Components/DeleteEventModal/DeleteEventModal.js";
export const App = () => {
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState("");
  const [clicked, setClicked] = useState(void 0);
  const [events, setEvents] = useState(localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : []);
  const eventForDate = (date) => events.find((e) => e.date === date);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(dt.getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const dateString = firstDayOfMonth.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    setDateDisplay(`${dt.toLocaleString("en-GB", {month: "long"})} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    const daysArr = [];
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${i - paddingDays}/${month + 1}/${year}`;
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString
        });
      } else {
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: ""
        });
      }
    }
    setDays(daysArr);
  }, [events, nav]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    id: "container"
  }, /* @__PURE__ */ React.createElement(CalendarHeader, {
    dateDisplay,
    onNext: () => setNav(nav + 1),
    onBack: () => setNav(nav - 1)
  }), /* @__PURE__ */ React.createElement("div", {
    id: "weekdays"
  }, /* @__PURE__ */ React.createElement("div", null, "Monday"), /* @__PURE__ */ React.createElement("div", null, "Tuesday"), /* @__PURE__ */ React.createElement("div", null, "Wednesday"), /* @__PURE__ */ React.createElement("div", null, "Thursday"), /* @__PURE__ */ React.createElement("div", null, "Friday"), /* @__PURE__ */ React.createElement("div", null, "Saturday"), /* @__PURE__ */ React.createElement("div", null, "Sunday")), /* @__PURE__ */ React.createElement("div", {
    id: "calendar"
  }, days.map((day, index) => /* @__PURE__ */ React.createElement(Day, {
    key: index,
    day,
    onClick: () => {
      if (day.value !== "padding") {
        setClicked(day.date);
      }
    }
  })))), clicked && !eventForDate(clicked) && /* @__PURE__ */ React.createElement(NewEventModal, {
    onClose: () => setClicked(null),
    onSave: (title) => {
      setEvents([...events, {title, date: clicked}]);
      setClicked(null);
    }
  }), clicked && eventForDate(clicked) && /* @__PURE__ */ React.createElement(DeleteEventModal, {
    onClose: () => setClicked(null),
    eventText: eventForDate(clicked).title,
    onDelete: () => {
      setEvents(events.filter((e) => e.date !== clicked));
      setClicked(null);
    }
  }));
};
