import React, {useState, useEffect} from 'react';
import {CalendarHeader} from "./Components/CalendarHeader/CalendarHeader";
import {Day} from "./Components/Day/Day";
import {NewEventModal} from "./Components/NewEventModal/NewEventModal";
import {DeleteEventModal} from "./Components/DeleteEventModal/DeleteEventModal";

const App = () => {

  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState(undefined);
  const [events, setEvents] = useState(
      localStorage.getItem('events') ?
          JSON.parse(localStorage.getItem('events')) :
          []
  );


  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])
  // Кожного разу, як івентс(другий аргумент) змінюється в стейті, сетається значення івентс в локал сторедж

  useEffect(() => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(dt.getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth(); //4 moth object using index value, it starts from 0, not 1(jan=0)
    const year = dt.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);

    const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleString('en-GB', {month: 'long'})} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);


    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${i - paddingDays}/${month + 1}/${year}`

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        })
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        })
      }
    }

    setDays(daysArr);

  }, [events, nav])


  // 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40// 38:40
  return (
      <>
        <div id="container">
          <CalendarHeader
              dateDisplay={dateDisplay}
              onNext={() => setNav(nav + 1)}
              onBack={() => setNav(nav - 1)}
          />

          <div id="weekdays">
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
          </div>

          <div id="calendar">
            {days.map((day, index) => (
                <Day key={index} day={day}
                     onClick={() => {
                       if (day.value !== 'padding') {
                         setClicked(day.date);
                       }
                     }
                     }/>
            ))}
          </div>

        </div>

        {clicked && !eventForDate(clicked) &&
        <NewEventModal
            onClose={() => setClicked(null)}
            onSave={title => {
              setEvents([...events, { title, date: clicked}]); // перезаписує всі івенти(реструктурірує через спред оператор) в масиві і додає 1 новий
              setClicked(null);
            }}
        />
        }

        {clicked && eventForDate(clicked) &&
        <DeleteEventModal
            onClose={() => setClicked(null)}
            eventText={eventForDate(clicked).title}
            onDelete={() => {
              setEvents(events.filter(e => e.date !== clicked)); //оставляє всі івенти в масіві, крім того, в якому дата рівна кліку
              setClicked(null);
            }
            }
        />
        }
      </>
  );
}

export default App