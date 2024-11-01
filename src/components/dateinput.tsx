import { DateInputProps } from "../types/types";

export default function DateInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateInputProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-6 gap-2 border-2 p-2 h-full justify-between items-center bg-gray-300 mx-2 sm:mx-4 shadow-lg">
      <div className="flex sm:flex-row flex-col gap-2 h-full justify-between items-center">
        <label className="flex items-center border-2 rounded-md px-2 cursor-pointer">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-28 ml-2 bg-inherit cursor-pointer"
          />
        </label>
        <label className="flex items-center border-2 rounded-md px-2 cursor-pointer">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-28 ml-2 bg-inherit cursor-pointer"
          />
        </label>
      </div>
      <h4 className="flex cursor-pointer hover:shadow-lg hover:shadow-orange-200">
        Book a new Entry
      </h4>
    </div>
  );
}
