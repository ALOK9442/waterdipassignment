export interface Booking {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
}

export interface ChartProps {
  startDate: string;
  endDate: string;
  booking: Booking[];
}
