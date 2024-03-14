import weeklyAvailability from "../../json/weekly_availability.json";

export default function Schedule() {
  return (
    <div className="absolute top-0 right-0">
      <table>
        <caption>Upcoming availability</caption>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>VIQ</th>
            <th>MDPI</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(weeklyAvailability).map(([day, details]) => (
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
