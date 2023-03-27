import { useState, useEffect } from "react";
import Clock from "react-clock";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      return JSON.parse(savedTodoList);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(new Date());

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

  const d = new Date();
  const day = days[d.getDay()];
  const date = d.getDate();
  const year = d.getFullYear();
  const month = months[d.getMonth()];

  const stringDate = date + " " + month + " " + year;

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([...todoList, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  // Save todo list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleDelete = (index) => {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleComplete = (index) => {
    const newTodoList = [...todoList];
    newTodoList[index].completed = !newTodoList[index].completed;
    setTodoList(newTodoList);
  };

  return (
    <div className="bg-[#0f172a] h-7/12 w-fit p-5">
      <div className="grid grid-cols-3 text-left items-center">
        <section id="header" className="col-span-2 row-span-1">
          <h1 className="text-7xl text-[#f1f1f1] relative bottom-4">
            {day}, <span className="text-[2rem]">{stringDate}</span>
          </h1>
        </section>

        <Clock
          className="justify-self-end"
          renderMinuteMarks={false}
          value={value}
        />
      </div>
      <div className="flex mt-12 justify-between">
        <section id="schedule" className="text-[#b3c7d6] text-left">
          <h2>Work Availability</h2>
          <ScheduleTable />
        </section>

        <section id="todo" className="justify-self-end col-start-3 text-left">
          <h1 className="text-[#b3c7d6]">To do:</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="bg-[#b3c7d6] text-gray-800 rounded"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-center bg-[#8db596] rounded px-2 ml-2 mr-2 mb-2 text-gray-800"
            >
              +
            </button>
          </form>

          <ul>
            {todoList.map((todo, index) => (
              <li
                key={index}
                className={`text-[#b3c7d6] ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-2 default:bg-green-500"
                  checked={todo.completed}
                  onChange={() => handleComplete(index)}
                />

                {todo.text}

                <button className="ml-2" onClick={() => handleDelete(index)}>
                  <div className="h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 -4 26 26"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-auto h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
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
  const [timezone, setTimezone] = useState("UTC+8");

  const handleToggle = () => {
    setTimezone(timezone === "UTC+1" ? "UTC+8" : "UTC+1");
  };

  return (
    <div className="text-[#b3c7d6]">
      <div className="flex items-center">
        <span className="mr-2">Timezone:</span>
        <button
          className={`relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-gray-400 rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
            timezone === "UTC+8" ? "bg-gray-400" : "bg-gray-200"
          }`}
          onClick={handleToggle}
        >
          <span className="sr-only">Toggle timezone</span>
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white transform transition ease-in-out duration-200 ${
              timezone === "UTC+8" ? "translate-x-0" : "translate-x-6"
            }`}
          />
        </button>
        <span className="ml-2">{timezone}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>{timezone === "UTC+8" ? "Perth time" : "Swiss time"}</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((scheduleItem) => (
            <tr key={scheduleItem.day}>
              <td className="pr-5">{scheduleItem.day}</td>
              <td>
                {timezone === "UTC+8"
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
