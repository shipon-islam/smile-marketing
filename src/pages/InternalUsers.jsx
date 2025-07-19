import SummaryBox from "@/components/SummaryBox";
import InternalUsersTable from "@/components/tables/InternalUsersTable";
import { Card } from "@/components/ui/card";

export default function InternalUsers() {
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <SummaryBox
          title="internal admin"
          items="5 person"
          icon="eos-icons:admin"
        />
        <SummaryBox
          title="internal Team"
          items="10 person"
          icon="fluent:people-team-28-regular"
        />
        <SummaryBox
          title="internal guest"
          items="2 person"
          icon="stash:user-group"
        />
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <InternalUsersTable />
      </Card>
    </div>
  );
}
