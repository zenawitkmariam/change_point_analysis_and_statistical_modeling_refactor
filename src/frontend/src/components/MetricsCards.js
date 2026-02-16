export default function MetricsCards({ metrics }) {
  return (
    <div className="cards">
      <div>Avg Price: ${metrics.average_price}</div>
      <div>Volatility: {metrics.volatility}</div>
    </div>
  );
}
