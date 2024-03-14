import React, { useState, useEffect } from "react";

// This is all a bit of a mess because I wanted to get it functional quickly so that I could use it. It could do with a refactor.

export default function Schedule() {
  const [thisWeeksAvailability, setThisWeeksAvailability] = useState(null);
  const [nextWeeksAvailability, setNextWeeksAvailability] = useState(null);

  useEffect(() => {
    // Function to format date as "YYYY-MM-DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Calculate the offset to Monday (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
    const offsetToMonday = currentDay === 0 ? 6 : currentDay - 1;

    // Calculate the date of this week's Monday
    const thisWeekMonday = new Date(today);
    thisWeekMonday.setDate(today.getDate() - offsetToMonday);

    // Calculate the date of next week's Monday
    const nextWeekMonday = new Date(thisWeekMonday);
    nextWeekMonday.setDate(thisWeekMonday.getDate() + 7);

    const thisWeek = formatDate(thisWeekMonday);
    const nextWeek = formatDate(nextWeekMonday);

    // Import this week's availability and next week's (if available).
    const thisWeeksAvailabilityPath = `../../json/weekly_availability_${thisWeek}.json`;
    const nextWeeksAvailabilityPath = `../../json/weekly_availability_${nextWeek}.json`;

    import(thisWeeksAvailabilityPath)
      .then((thisWeeksData) => {
        setThisWeeksAvailability(thisWeeksData.default);
        console.log("this week's data", thisWeeksData.default);
      })
      .catch((error) => {
        console.error(`Error loading this week's availability:`, error);
      });

    import(nextWeeksAvailabilityPath)
      .then((nextWeeksData) => {
        setNextWeeksAvailability(nextWeeksData.default);
      })
      .catch((error) => {
        console.error(`Error loading next week's availability:`, error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="absolute top-0 right-0 ">
      <table>
        <caption>This week's work schedule</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>VIQ</th>
            <th>MDPI</th>
          </tr>
        </thead>
        <tbody>
          {/* Render this week's availability */}
          {thisWeeksAvailability &&
            thisWeeksAvailability.map((day) => {
              // Parse the date string into a Date object
              const date = new Date(day.date);

              // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
              const dayOfWeek = date.getDay();

              // Define an array to map day indices to day names
              const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];

              // Get the name of the day using the day index
              const dayName = daysOfWeek[dayOfWeek];

              return (
                <tr key={day.date}>
                  <td>{dayName}</td>
                  <td>{day.date}</td>
                  <td>
                    {day.viq && typeof day.viq === "object"
                      ? Object.entries(day.viq).map(([key, value]) =>
                          value ? (
                            <div key={key}>
                              {key.replace("_", "-")}: {value}
                            </div>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </td>
                  <td>{day.mdpi}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <table>
        <caption>Next week's work schedule</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>VIQ</th>
            <th>MDPI</th>
          </tr>
        </thead>
        <tbody>
          {/* Render this week's availability */}
          {nextWeeksAvailability &&
            nextWeeksAvailability.map((day) => {
              // Parse the date string into a Date object
              const date = new Date(day.date);

              // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
              const dayOfWeek = date.getDay();

              // Define an array to map day indices to day names
              const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];

              // Get the name of the day using the day index
              const dayName = daysOfWeek[dayOfWeek];

              return (
                <tr key={day.date}>
                  <td>{dayName}</td>
                  <td>{day.date}</td>
                  <td>
                    {day.viq && typeof day.viq === "object"
                      ? Object.entries(day.viq).map(([key, value]) =>
                          value ? (
                            <div key={key}>
                              {key.replace("_", "-")}: {value}
                            </div>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </td>
                  <td>{day.mdpi}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
