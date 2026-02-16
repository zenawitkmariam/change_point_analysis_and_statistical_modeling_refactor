import React from "react";
import EventTimeline from "./EventTimeline";

export default function Events({ events }) {
  return (
    <div className="container">
      <h2>Market Events</h2>
      <EventTimeline events={events} />
    </div>
  );
}
