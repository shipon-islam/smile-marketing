export default function SummaryBox({ title, amount, items }) {
  return (
    <div className="bg-white text-gray-700 px-4  lg:px-8 xl:px-14 py-4 lg:py-7 rounded-md shadow">
      <h4 className="capitalize font-semibold text-[1.4rem] lg:text-2xl">
        {title}
      </h4>
      <h5 className="font-medium text-2xl lg:text-3xl my-2">{amount}</h5>
      <p className="font-medium text-lg text-gray-500">{items}</p>
    </div>
  );
}
