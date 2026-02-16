export default function EventTimeline({ events }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Key Oil Market Events</h2>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderLeft: "4px solid #f59e0b",
                background: "#fef3c7",
              }}
            >
              <strong>{event.Date}</strong> — <strong>{event.Event}</strong>
              <br />
              <em>{event.Category}</em>
              <br />
              <span>{event.Description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
