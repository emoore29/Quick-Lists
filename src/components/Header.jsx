import { dateString, day } from "../utils/dates";
import { useState, useEffect } from "react";
import ThemeSwitch from "./themeSwitch";

export default function Header() {
  const [dateTime, setDateTime] = useState(new Date());
  // CLOCK TIMER
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id="header"
      className="px-10 py-10 w-full m-auto
          flex justify-center items-center gap-5
          "
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-lg font-normal">
          <span className="text-primary dark:text-dmPrimary">{day + " "}</span>
          <span>{dateString + " "}</span>
          <span className="opacity-60 text-lg">
            {dateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </h1>
      </div>

      <div className="flex items-center">
        <ThemeSwitch
          color="var(--color-primary)"
          dmColor="var(--color-darkmode-primary)"
        />
      </div>
    </div>
  );
}
