import { DateInputProps } from "../types/types";

export default function DateInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateInputProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-6 gap-2 border-2 w-fit p-2 h-full justify-center items-center bg-gray-300 ml-2 sm:ml-8">
      <label className="flex items-center">
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-28 ml-2 bg-gray-300"
        />
      </label>
      <label className="flex items-center">
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-28 ml-2 bg-gray-300"
        />
      </label>
    </div>
  );
}
