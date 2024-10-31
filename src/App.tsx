import { useState } from "react";
import "./App.css";
import TimeChart from "./charts/timeseries";

function App() {
  const [startDate, setStartDate] = useState<string>("2015-06-30");
  const [endDate, setEndDate] = useState<string>("2015-08-09");
  return (
    <div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <TimeChart
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
