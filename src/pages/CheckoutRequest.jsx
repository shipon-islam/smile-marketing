import Card from "@/components/Card";
import SummaryBox from "@/components/SummaryBox";
import CheckoutTable from "@/components/tables/CheckoutTable";
export default function CheckoutRequest() {
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2  gap-4 mb-8 w-full">
        <SummaryBox
          title="Checkin Product"
          items="300 items"
          icon="material-symbols:tab-new-right-outline"
        />
        <SummaryBox
          title="Checkout Product"
          items="300 items"
          icon="mage:box-3d-check"
        />
      </div>
      <Card>
        <CheckoutTable />
      </Card>
    </div>
  );
}
