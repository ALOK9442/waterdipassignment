import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Booking } from "../types/types";
import { ChartProps as SparklineChartsProps } from "../types/types";

export default function SparklineCharts({
  startDate,
  endDate,
  booking,
}: SparklineChartsProps) {
  const [adultVisitorData, setAdultVisitorData] = useState<number[]>([]);
  const [childrenVisitorData, setChildrenVisitorData] = useState<number[]>([]);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);

  useEffect(() => {
    const bookings: Booking[] = booking;

    const filteredData = bookings.filter((booking) => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return (
        (!startDate || bookingDate >= new Date(startDate)) &&
        (!endDate || bookingDate <= new Date(endDate))
      );
    });

    const adultVisitors = filteredData.map((booking) =>
      parseInt(booking.adults || "0")
    );
    const childrenVisitors = filteredData.map((booking) =>
      parseInt(booking.children || "0")
    );

    const totalAdults = adultVisitors.reduce((sum, count) => sum + count, 0);
    const totalChildren = childrenVisitors.reduce(
      (sum, count) => sum + count,
      0
    );

    setAdultVisitorData(adultVisitors);
    setChildrenVisitorData(childrenVisitors);
    setTotalAdults(totalAdults);
    setTotalChildren(totalChildren);
  }, [startDate, endDate, booking]);

  const sparklineOptions = (
    title: string,
    total: number,
    data: number[]
  ): ApexOptions => ({
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
        easing: "easeinout",
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#8dc4e7"],
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
    <div className="flex flex-col sm:flex-row gap-4 m-2 justify-around mt-8">
      <div className="text-center p-4 border border-gray-300 rounded-lg bg-[#f4f4f4] sm:w-2/5 shadow-lg">
        <h4 className="mb-2 text-lg font-bold">Total Adults</h4>
        <ReactApexChart
          options={sparklineOptions("Adults", totalAdults, adultVisitorData)}
          series={[{ data: adultVisitorData }]}
          type="line"
        />
      </div>
      <div className="text-center p-4 border border-gray-300 rounded-lg bg-[#f4f4f4] sm:w-2/5 shadow-lg">
        <h4 className="mb-2 text-lg font-bold">Total Children</h4>
        <ReactApexChart
          options={sparklineOptions(
            "Children",
            totalChildren,
            childrenVisitorData
          )}
          series={[{ data: childrenVisitorData }]}
          type="line"
        />
      </div>
    </div>
  );
}
