import HotelPng from "../assets/hotelpng.png";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center bg-gray-800 text-white p-4 mb-2">
      <h1 className="sm:text-2xl">Hotel Data Dashboard</h1>
      <div className="flex items-center cursor-pointer">
        <img src={HotelPng} alt="hotel" className="w-8 h-8" />
        <span className="ml-2">Hotel</span>
      </div>
    </header>
  );
}
