import React from "react";
import MetricsCards from "./MetricsCards";
import Filters from "./Filters";
import PriceChart from "./PriceChart";

export default function Dashboard({
  prices,
  events,
  changePoints,
  metrics,
  onFilter,
}) {
  return (
    <div className="container">
      <MetricsCards metrics={metrics} />
      <br />
      <Filters onFilter={onFilter} />
      <PriceChart prices={prices} events={events} changePoints={changePoints} />
    </div>
  );
}
