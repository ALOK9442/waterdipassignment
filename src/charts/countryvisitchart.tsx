import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Booking } from "../types/types";
import { ChartProps as CountryVisitorsChartProps } from "../types/types";

export default function CountryVisitorsChart({
  startDate,
  endDate,
  booking,
}: CountryVisitorsChartProps) {
  const [countryData, setCountryData] = useState<{
    countries: string[];
    visitors: number[];
  }>({
    countries: [],
    visitors: [],
  });

  useEffect(() => {
    const bookings: Booking[] = booking;

    const visitorsPerCountry: Record<string, number> = {};

    const filteredData = bookings.filter((booking) => {
      const bookingDate = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );
      return (
        (!startDate || bookingDate >= new Date(startDate)) &&
        (!endDate || bookingDate <= new Date(endDate))
      );
    });

    filteredData.forEach((booking) => {
      const { country } = booking;
      const totalVisitors =
        parseInt(booking.adults || "0") +
        parseInt(booking.children || "0") +
        parseInt(booking.babies || "0");

      visitorsPerCountry[country] =
        (visitorsPerCountry[country] || 0) + totalVisitors;
    });

    const countries = Object.keys(visitorsPerCountry);
    const countryVisitors = countries.map(
      (country) => visitorsPerCountry[country]
    );
    setCountryData({ countries, visitors: countryVisitors });
  }, [startDate, endDate, booking]);

  const columnChartOptions: ApexOptions = {
    series: [
      {
        name: "Visitors",
        data: countryData.visitors,
      },
    ],
    chart: {
      type: "bar",
      height: 300,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Number of Visitors per Country",
      align: "left",
    },
    xaxis: {
      categories: countryData.countries,
      title: {
        text: "Country",
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={columnChartOptions}
        series={columnChartOptions.series}
        type="bar"
      />
    </div>
  );
}
