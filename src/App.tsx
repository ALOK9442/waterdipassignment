import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface Booking {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
}
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/hotel_bookings_1000.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n");
        const header = rows[0].split(",");
        const dataRows = rows.slice(1);

        const bookings = dataRows.map((row) => {
          const values = row.split(",");
          const booking: Booking = {
            arrival_date_year: values[0],
            arrival_date_month: values[1],
            arrival_date_day_of_month: values[2],
            adults: values[3],
            children: values[4],
            babies: values[5],
            country: values[6],
          };
          return booking;
        });

        setData(bookings); // Set state with parsed data
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
