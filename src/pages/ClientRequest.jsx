import SummaryBox from "@/components/SummaryBox";
import ClientRequestTable from "@/components/tables/ClientRequestTable";
import { Card } from "@/components/ui/card";
import useClientRequestCount from "@/hooks/useClientRequestCount";
import { UseUtility } from "@/providers/AllUtilityProvider";
export default function ClientRequest() {
  const { newCount, inProgressCount, completedCount } = useClientRequestCount();
  const { setClientStatus } = UseUtility();
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <div onClick={() => setClientStatus("new")} className="cursor-pointer">
          <SummaryBox
            title="New Product"
            items={`${newCount} items`}
            icon="material-symbols:new-label"
          />
        </div>
        <div
          onClick={() => setClientStatus("in_progress")}
          className="cursor-pointer"
        >
          <SummaryBox
            title="In progress Product"
            items={`${inProgressCount} items`}
            icon="nonicons:loading-16"
          />
        </div>
        <div
          onClick={() => setClientStatus("completed")}
          className="cursor-pointer"
        >
          <SummaryBox
            title="Completed Product"
            items={`${completedCount} items`}
            icon="ic:outline-cloud-done"
          />
        </div>
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <ClientRequestTable />
      </Card>
    </div>
  );
}
