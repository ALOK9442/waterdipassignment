import { useState } from "react";
import "./App.css";
import TimeChart from "./charts/timeseries";
import { Booking } from "./types/types";
import CountryVisitorsChart from "./charts/countryvisitchart";
import SparklineCharts from "./charts/sparklinechart";
import { useBookings } from "./customhook/usebookings";

function App() {
  const [startDate, setStartDate] = useState<string>("2015-06-30");
  const [endDate, setEndDate] = useState<string>("2015-07-09");
  const booking: Booking[] = useBookings();
  return (
    <div>
      <div className="text-red-500">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TimeChart startDate={startDate} endDate={endDate} booking={booking} />
        <CountryVisitorsChart
          startDate={startDate}
          endDate={endDate}
          booking={booking}
        />
        <SparklineCharts
          startDate={startDate}
          endDate={endDate}
          booking={booking}
        />
      </div>
    </div>
  );
}

export default App;
