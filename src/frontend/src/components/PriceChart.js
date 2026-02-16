import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
export default function PriceChart({ prices, events, changePoints }) {
  return (
    <LineChart width={900} height={400} data={prices}>
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="Price" stroke="#2563eb" dot={false} />

      {changePoints.map((cp, i) => (
        <ReferenceLine key={i} x={cp.date} stroke="red" strokeDasharray="3 3" />
      ))}

      {events.map((e, i) => (
        <ReferenceLine key={i} x={e.Date} stroke="orange" />
      ))}
    </LineChart>
  );
}
