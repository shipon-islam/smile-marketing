import { Icon } from "@iconify/react";
export default function SummaryBox({ icon, title, amount, items }) {
  return (
    <div className="flex items-center gap-x-4 bg-white text-gray-700 px-4  lg:px-8  py-4 lg:py-7 rounded-md shadow">
      <Icon icon={icon} width="50" height="50" />
      <div>
        <h4 className="capitalize font-semibold text-xl">{title}</h4>
        <h5 className="font-medium text-xl my-2">{amount}</h5>
        <p className="font-medium text-lg text-gray-500">{items}</p>
      </div>
    </div>
  );
}
