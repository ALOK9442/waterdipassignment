import { DateInputProps } from "../types/types";

export default function DateInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateInputProps) {
  return (
    <div className="flex sm:flex-row flex-col gap-6 pb-6">
      <label className="flex items-center">
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-28 ml-2"
        />
      </label>
      <label className="flex items-center">
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-28 ml-2"
        />
      </label>
    </div>
  );
}
