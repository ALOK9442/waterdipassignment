import { useEffect, useState } from "react";
import "./App.css";
import ReactApexChart from "react-apexcharts";

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
  const [data, setData] = useState<Booking[]>([]);
  const [chartData, setChartData] = useState<{ visitorsPerDay: number[]; days: string[] }>({
    visitorsPerDay: [],
    days: [],
  });

  useEffect(() => {
    fetch("/hotel_bookings_1000.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n");
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

        setData(bookings);
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    const visitorsPerDay: Record<string, number> = {};

    data.forEach((booking) => {
      const day = booking.arrival_date_day_of_month;
      const totalVisitors =
        parseInt(booking.adults) +
        parseInt(booking.children) +
        parseInt(booking.babies);

      if (visitorsPerDay[day]) {
        visitorsPerDay[day] += totalVisitors;
      } else {
        visitorsPerDay[day] = totalVisitors;
      }
    });

    const days = Object.keys(visitorsPerDay).sort((a, b) => Number(a) - Number(b));
    const visitors = days.map((day) => visitorsPerDay[day]);

    setChartData({ visitorsPerDay: visitors, days });
  }, [data]);

  const options = {
    chart: {
      id: "visitor-chart",
    },
    xaxis: {
      categories: chartData.days,
      title: {
        text: "Day of the Month",
      },
    },
    yaxis: {
      title: {
        text: "Total Visitors",
      },
    },
    title: {
      text: "Hotel Visitors per Day",
      align: "center" as "center",
    },
  };
  

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "Visitors", data: chartData.visitorsPerDay }]}
      type="area"
      height={350}
      width={350}
    />
  );
}

export default App;
