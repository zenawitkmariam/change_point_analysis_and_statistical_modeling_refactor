import { useEffect, useState } from "react";
import {
  fetchPrices,
  fetchEvents,
  fetchChangePoints,
  fetchMetrics,
} from "./api";
import PriceChart from "./components/PriceChart";
import EventTimeline from "./components/EventTimeline";
import Filters from "./components/Filters";
import MetricsCards from "./components/MetricsCards";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetchPrices().then(setPrices);
    fetchEvents().then(setEvents);
    fetchChangePoints().then(setChangePoints);
    fetchMetrics().then(setMetrics);
  }, []);

  return (
    <div className="container">
      <h1>Brent Oil Market Dashboard</h1>
      <MetricsCards metrics={metrics} />
      <br />
      <Filters onFilter={setPrices} />
      <PriceChart prices={prices} events={events} changePoints={changePoints} />
      <EventTimeline events={events} />
    </div>
  );
}

export default App;
