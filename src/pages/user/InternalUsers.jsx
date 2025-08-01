import SummaryBox from "@/components/SummaryBox";
import InternalUsersTable from "@/components/tables/InternalUsersTable";
import { Card } from "@/components/ui/card";
import useUsersCount from "@/hooks/useUsersCount";

export default function InternalUsers() {
  const { adminCount, teamCount, guestCount } = useUsersCount();

  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <SummaryBox
          title="internal admin"
          items={`${adminCount} person`}
          icon="eos-icons:admin"
        />
        <SummaryBox
          title="internal Team"
          items={`${teamCount} person`}
          icon="stash:user-group"
        />
        <SummaryBox
          title="internal guest"
          items={`${guestCount} person`}
          icon="fluent:people-team-28-regular"
        />
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <InternalUsersTable />
      </Card>
    </div>
  );
}
