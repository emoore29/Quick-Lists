import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState(new Date());

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      const day = days[d.getDay()];
      const year = d.getFullYear();
      const date = d.getDate();
      const month = months[d.getMonth()];
      setDay(day);
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([...todoList, inputValue]);
    setInputValue("");
  };

  return (
    <div className="bg-[#0f172a] h-1/2 w-1/2 p-5 grid grid-cols-2 text-left">
      <div>
        <section id="header" className="mb-12">
          <h1 className="text-7xl text-[#f1f1f1]">{day}</h1>
          <p className="text-[#b3c7d6]">{date.toLocaleString()}</p>
        </section>
        <section id="schedule" className="text-[#b3c7d6]">
          <h2>Work Availability</h2>
          <ScheduleTable />
        </section>
      </div>
      <section id="todo">
        <h1 className="text-[#b3c7d6]">To Do</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="bg-[#b3c7d6] text-gray-800 rounded"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            class="text-center bg-[#8db596] rounded px-2 ml-2 mr-2 mb-2 text-gray-800"
          >
            +
          </button>
        </form>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index} className="text-[#b3c7d6]">
              {todo}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const scheduleData = [
  {
    day: "Sun",
    perthTime: "16:00 - 24:00",
    swissTime: "09:00 - 23:00",
  },
  {
    day: "Mon",
    perthTime: "00:00 - 06:00 | 08:00 - 24:00",
    swissTime: "01:00 - 23:00",
  },
  {
    day: "Tue",
    perthTime: "00:00 - 06:00 | 08:00 - 24:00",
    swissTime: "01:00 - 23:00",
  },
  {
    day: "Wed",
    perthTime: "00:00 - 06:00 | 08:00 - 24:00",
    swissTime: "01:00 - 23:00",
  },
  {
    day: "Thu",
    perthTime: "00:00 - 06:00 | 08:00 - 24:00",
    swissTime: "01:00 - 23:00",
  },
  {
    day: "Fri",
    perthTime: "00:00 - 06:00 | 08:00 - 24:00",
    swissTime: "01:00 - 23:00",
  },
];

function ScheduleTable() {
  const [showPerthTime, setShowPerthTime] = useState(true);

  const toggleTimezone = () => {
    setShowPerthTime((prev) => !prev);
  };

  return (
    <div className="text-[#b3c7d6]">
      <button onClick={toggleTimezone}>
        Show {showPerthTime ? "Swiss" : "Perth"} time
      </button>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>{showPerthTime ? "Perth time" : "Swiss time"}</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((scheduleItem) => (
            <tr key={scheduleItem.day}>
              <td className="pr-5">{scheduleItem.day}</td>
              <td>
                {showPerthTime
                  ? scheduleItem.perthTime
                  : scheduleItem.swissTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
