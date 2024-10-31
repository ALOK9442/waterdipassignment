import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Booking } from "../types/types";
import { ChartProps as TimeChartProps } from "../types/types";

export default function TimeChart({ startDate, endDate }: TimeChartProps) {
  const [data, setData] = useState<Booking[]>([]);
  const [chartData, setChartData] = useState<{
    visitorsPerDay: number[];
    days: string[];
  }>({
    visitorsPerDay: [],
    days: [],
  });

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

        setData(bookings);
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    const visitorsPerDay: Record<string, number> = {};
    const bookingData = JSON.parse(localStorage.getItem("booking") || "[]");
    console.log(bookingData);
    const filteredData = data.filter((booking) => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return (
        (!startDate || bookingDate >= new Date(startDate)) &&
        (!endDate || bookingDate <= new Date(endDate))
      );
    });

    filteredData.forEach((booking) => {
      const {
        arrival_date_year,
        arrival_date_month,
        arrival_date_day_of_month,
      } = booking;
      const day = `${arrival_date_year}-${arrival_date_month}-${arrival_date_day_of_month}`;
      const totalVisitors =
        parseInt(booking.adults || "0") +
        parseInt(booking.children || "0") +
        parseInt(booking.babies || "0");

      visitorsPerDay[day] = (visitorsPerDay[day] || 0) + totalVisitors;
    });
    // console.log(visitorsPerDay);
    const days = Object.keys(visitorsPerDay).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const visitors = days.map((day) => visitorsPerDay[day]);

    setChartData({ visitorsPerDay: visitors, days });
  }, [data, startDate, endDate]);

  const options: ApexOptions = {
    series: [
      {
        name: "Visitors",
        data: chartData.visitorsPerDay,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      height: 500,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
        tools: { pan: true },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Visitors per Day",
      align: "left",
    },
    fill: {
      type: "gradient",
      colors: ["#0330fc", "#fcba03", "#000"],
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      title: {
        text: "Number of Visitors",
      },
    },
    xaxis: {
      type: "datetime",
      categories: chartData.days,
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={[{ name: "Visitors", data: chartData.visitorsPerDay }]}
        type="area"
        height={500}
        width={500}
      />
    </div>
  );
}
