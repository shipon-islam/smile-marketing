import SummaryBox from "@/components/SummaryBox";
import ClientRequestTable from "@/components/tables/ClientRequestTable";
import { Card } from "@/components/ui/card";
import useClientRequestCount from "@/hooks/useClientRequestCount";
export default function ClientRequest() {
  const { newCount, inProgressCount, completedCount } = useClientRequestCount();
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <SummaryBox
          title="New Product"
          items={`${newCount} items`}
          icon="material-symbols:new-label"
        />
        <SummaryBox
          title="In progress Product"
          items={`${inProgressCount} items`}
          icon="nonicons:loading-16"
        />
        <SummaryBox
          title="Completed Product"
          items={`${completedCount} items`}
          icon="ic:outline-cloud-done"
        />
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <ClientRequestTable />
      </Card>
    </div>
  );
}
