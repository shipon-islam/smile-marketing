export default function SummaryBox({ title, amount, items }) {
  return (
    <div className="bg-white text-gray-700 px-14 py-7 rounded-md shadow">
      <h4 className="capitalize font-semibold text-2xl">{title}</h4>
      <h5 className="font-medium text-3xl my-2">{amount}</h5>
      <p className="font-medium text-lg">{items}</p>
    </div>
  );
}
