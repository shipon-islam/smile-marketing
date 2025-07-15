import InventoryTable from "@/components/tables/InventoryTable";
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
      <div className="mt-8">
        <div className="mt-4">
          <div className={`bg-white px-3 sm:px-5 py-6 rounded-md shadow`}>
            {" "}
            <InventoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
