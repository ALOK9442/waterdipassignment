import { useEffect, useState } from "react";
import "./App.css";
import TimeChart from "./charts/timeseries";
import { Booking } from "./types/types";
import CountryVisitorsChart from "./charts/countryvisitchart";
import SparklineCharts from "./charts/sparklinechart";

function App() {
  const [startDate, setStartDate] = useState<string>("2015-06-30");
  const [endDate, setEndDate] = useState<string>("2015-07-09");

  useEffect(() => {
    fetch("/hotel_bookings_1000.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n");
        const dataRows = rows.slice(1).filter((row) => row.trim() !== "");

        const bookings = dataRows.map((row) => {
          const values = row.split(",").map((value) => value.trim());
          const booking: Booking = {
            arrival_date_year: values[1],
            arrival_date_month: values[2],
            arrival_date_day_of_month: values[3],
            adults: values[4],
            children: values[5],
            babies: values[6],
            country: values[7],
          };
          return booking;
        });
        localStorage.setItem("booking", JSON.stringify(bookings));
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);
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
      <TimeChart startDate={startDate} endDate={endDate} />
      <CountryVisitorsChart startDate={startDate} endDate={endDate} />
      <SparklineCharts startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default App;
