import { useState } from "react";
import nextWeek from "../../json/next_week.json";
import thisWeek from "../../json/this_week.json";
import { useEffect } from "react";

export default function Schedule() {
  const [todaysDate, setTodaysDate] = useState("");

  useEffect(() => {
    const today = new Date();
    // Capitalise file
    // Convert todaysDate to a string in the format "YYYY-MM-DD"
    const formattedDate = today.toISOString().split("T")[0];

    setTodaysDate(formattedDate);
  }, []);

  return (
    <div className="text-xs mx-auto">
      <table>
        <caption>This week's schedule</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>VIQ</th>
            <th>MDPI</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(thisWeek).map(([day, details]) => (
            <tr
              key={day}
              className={`${
                todaysDate == details.date
                  ? "dark:text-dmPrimary text-primary"
                  : ""
              }`}
            >
              <td>{day}</td>
              <td>{details.date}</td>
              <td>
                {Object.entries(details.viq).map(([key, value]) =>
                  value ? (
                    <div key={key}>
                      {key.replace("_", " ").toUpperCase()}: {value}
                    </div>
                  ) : (
                    ""
                  )
                )}
              </td>
              <td>{details.mdpi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <caption>Next week</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>VIQ</th>
            <th>MDPI</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nextWeek).map(([day, details]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{details.date}</td>
              <td>
                {Object.entries(details.viq).map(([key, value]) =>
                  value ? (
                    <div key={key}>
                      {key.replace("_", " ").toUpperCase()}: {value}
                    </div>
                  ) : (
                    ""
                  )
                )}
              </td>
              <td>{details.mdpi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
