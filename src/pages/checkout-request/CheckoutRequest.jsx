import SummaryBox from "@/components/SummaryBox";
import CheckoutTable from "@/components/tables/CheckoutTable";
import { Card } from "@/components/ui/card";
import useCheckoutCount from "@/hooks/useCheckoutCount";
export default function CheckoutRequest() {
  const { pendingCount, approvedCount, rejectedCount } = useCheckoutCount();
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3  gap-4 mb-8 w-full">
        <SummaryBox
          title="Pending Product"
          items={`${pendingCount} items`}
          icon="streamline-ultimate:loading-bold"
        />
        <SummaryBox
          title="Approved Product"
          items={`${approvedCount} items`}
          icon="material-symbols:order-approve-outline-sharp"
        />
        <SummaryBox
          title="Rejected Product"
          items={`${rejectedCount} items`}
          icon="icon-park:reject"
        />
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <CheckoutTable />
      </Card>
    </div>
  );
}
