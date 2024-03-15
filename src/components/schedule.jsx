import nextWeek from "../../json/next_week.json";
import thisWeek from "../../json/this_week.json";

export default function Schedule() {
  return (
    <div className="absolute bottom-0 left-0 text-xs">
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
