import InventoryTable from "@/components/tables/InventoryTable";
import { Link } from "react-router-dom";
import SummaryBox from "../components/SummaryBox";
export default function Inventory() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-5">
        <SummaryBox
          title="items in storage"
          items="300 items"
          icon="fa-solid:store-alt"
        />
        <SummaryBox
          title="items checked out"
          items="105 items"
          icon="mdi:clipboard-check-outline"
        />
      </div>
      <Link
        to="/create-inventory"
        className="bg-deepBlue text-white px-8 py-2 capitalize font-medium rounded-md mt-8 ml-auto block w-fit"
      >
        create new inventory
      </Link>
      <div className="mt-8">
        <div className="mt-4">
          <div className={`bg-white px-3 sm:px-5 py-6 rounded-md shadow`}>
            <InventoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
