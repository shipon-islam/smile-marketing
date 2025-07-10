export default function RequestBox({ title, user, date, location }) {
  return (
    <div className="border border-gray-100 rounded-md p-3 mb-2">
      <h5 className="font-medium capitalize text-lg md:text-base">{title}</h5>
      <p className="text-sm md:text-xs capitalize my-0.5">{`requested by ${user} ${date}`}</p>
      <p className="capitalize text-sm md:text-xs">{location}</p>
      <div className="flex justify-between gap-x-4 mt-3">
        <button className="bg-[#DFF9EE] text-green-700 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md flex-1 cursor-pointer">
          approve
        </button>
        <button className="bg-[#FEEFF0] text-red-600 font-medium capitalize text-sm md:text-xs px-5 py-1.5 rounded-md flex-1 cursor-pointer">
          reject
        </button>
      </div>
    </div>
  );
}
