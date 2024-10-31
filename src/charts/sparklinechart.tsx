import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Booking } from "../types/types";
import { ChartProps as SparklineChartsProps } from "../types/types";

export default function SparklineCharts({ startDate, endDate }: SparklineChartsProps) {
  const [adultVisitorData, setAdultVisitorData] = useState<number[]>([]);
  const [childrenVisitorData, setChildrenVisitorData] = useState<number[]>([]);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("booking");
    const bookings: Booking[] = storedData ? JSON.parse(storedData) : [];

    const filteredData = bookings.filter((booking) => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return (
        (!startDate || bookingDate >= new Date(startDate)) &&
        (!endDate || bookingDate <= new Date(endDate))
      );
    });

    const adultVisitors = filteredData.map((booking) => parseInt(booking.adults || "0"));
    const childrenVisitors = filteredData.map((booking) => parseInt(booking.children || "0"));

    const totalAdults = adultVisitors.reduce((sum, count) => sum + count, 0);
    const totalChildren = childrenVisitors.reduce((sum, count) => sum + count, 0);

    setAdultVisitorData(adultVisitors);
    setChildrenVisitorData(childrenVisitors);
    setTotalAdults(totalAdults);
    setTotalChildren(totalChildren);
  }, [startDate, endDate]);

  const sparklineOptions = (title: string, total: number, data: number[]): ApexOptions => ({
    series: [{ data }],
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
      }
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      y: {
        formatter: function (val) {
          return `${val.toFixed(0)}`;
        },
      },
    },
    title: {
      text: `${title}: ${total}`,
      offsetX: 0,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px", gap: "30px" }}>
      <div style={{ textAlign: "center", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", width: "250px" }}>
        <h4 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>Total Adults</h4>
        <ReactApexChart
          options={sparklineOptions("Adults", totalAdults, adultVisitorData)}
          series={[{ data: adultVisitorData }]}
          type="line"
          height={120}
          width={220}
        />
      </div>
      <div style={{ textAlign: "center", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", width: "250px" }}>
        <h4 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>Total Children</h4>
        <ReactApexChart
          options={sparklineOptions("Children", totalChildren, childrenVisitorData)}
          series={[{ data: childrenVisitorData }]}
          type="line"
          height={120}
          width={220}
        />
      </div>
    </div>
  );
}