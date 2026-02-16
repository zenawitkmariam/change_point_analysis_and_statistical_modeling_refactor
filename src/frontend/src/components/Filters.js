import { fetchPrices } from "../api";

export default function Filters({ onFilter }) {
  const applyFilter = async (start, end) => {
    const data = await fetchPrices(`?start=${start}&end=${end}`);
    onFilter(data);
  };

  return (
    <div>
      <button onClick={() => applyFilter("2018-01-01", "2022-12-31")}>
        2018–2022
      </button>
    </div>
  );
}
