import { useEffect, useState } from "react";
import { Booking } from "../types/types";

export function useBookings(): Booking[] {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("bookings");
    if (cachedData) {
      setBookings(JSON.parse(cachedData));
    } else {
      fetch("/hotel_bookings_1000.csv")
        .then((response) => response.text())
        .then((text) => {
          const rows = text.split("\n");
          const dataRows = rows.slice(1).filter((row) => row.trim() !== "");
          const parsedBookings = dataRows.map((row) => {
            const values = row.split(",").map((value) => value.trim());
            return {
              arrival_date_year: values[1],
              arrival_date_month: values[2],
              arrival_date_day_of_month: values[3],
              adults: values[4],
              children: values[5],
              babies: values[6],
              country: values[7],
            };
          });
          setBookings(parsedBookings);
          localStorage.setItem("booking", JSON.stringify(parsedBookings));
        })
        .catch((error) => console.error("Error loading CSV:", error));
    }
  }, []);

  return bookings;
}
