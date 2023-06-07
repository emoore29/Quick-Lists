import { useState, useEffect } from "react";
import Clock from "react-clock";
import "./App.css";
import Routine from "./components/routine";
import Todo from "./components/todo";
import List from "./components/list"

function App() {
  // value = current date and time
  const [dateTime, setDateTime] = useState(new Date());

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

  const dateString = date + " " + month + " " + year;

  // Updates time every second and sets state accordingly. dateTime is used in the Clock.
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#93415c] h-full p-5">
      <div className="">
        <section id="header" className="mb-20">
          <h1 className="text-7xl text-black relative bottom-4">
            {day}, <span className="text-[2rem]">{dateString}</span>
          </h1>
          <h1 className="absolute top-0 right-0 text-3xl p-5 text-black">{dateTime.toLocaleTimeString()}</h1>
        </section>
        {/* <Clock
          className=""
          renderMinuteMarks={false}
          renderSecondHand={false}
          value={dateTime}
        /> */}
      </div>
      <div className="flex mt-12 justify-center gap-20">
        <List listName="Await" />
        <List listName="Routine" />
        <List listName="To do" />
      </div>
    </div>
  );
}

export default App;
