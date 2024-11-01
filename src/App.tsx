import { useState } from "react";
import "./App.css";
import TimeChart from "./charts/timeseries";
import { Booking } from "./types/types";
import CountryVisitorsChart from "./charts/countryvisitchart";
import SparklineCharts from "./charts/sparklinechart";
import { useBookings } from "./customhook/usebookings";
import DateInput from "./components/dateinput";

function App() {
  const [startDate, setStartDate] = useState<string>("2015-06-30");
  const [endDate, setEndDate] = useState<string>("2015-07-09");
  const booking: Booking[] = useBookings();
  return (
    <div className="w-full bg-gray-400">
      <h1 className="text-2xl font-bold p-4">Hotel Booking Data</h1>
      <DateInput
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
        <TimeChart startDate={startDate} endDate={endDate} booking={booking} />
        <CountryVisitorsChart
          startDate={startDate}
          endDate={endDate}
          booking={booking}
        />
      </div>
      <div className="pb-4">
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
