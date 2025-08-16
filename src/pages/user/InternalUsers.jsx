import SummaryBox from "@/components/SummaryBox";
import InternalUsersTable from "@/components/tables/InternalUsersTable";
import { Card } from "@/components/ui/card";
import useUsersCount from "@/hooks/useUsersCount";
import { UseUtility } from "@/providers/AllUtilityProvider";

export default function InternalUsers() {
  const { adminCount, teamCount, guestCount } = useUsersCount();
  const { setUserStatus } = UseUtility();
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <div className="cursor-pointer" onClick={() => setUserStatus("admin")}>
          <SummaryBox
            title="internal admin"
            items={`${adminCount} person`}
            icon="eos-icons:admin"
          />
        </div>
        <div className="cursor-pointer" onClick={() => setUserStatus("team")}>
          <SummaryBox
            title="internal Team"
            items={`${teamCount} person`}
            icon="stash:user-group"
          />
        </div>
        <div className="cursor-pointer" onClick={() => setUserStatus("guest")}>
          <SummaryBox
            title="internal guest"
            items={`${guestCount} person`}
            icon="fluent:people-team-28-regular"
          />
        </div>
      </div>
      <Card className="px-3 sm:px-5 py-6">
        <InternalUsersTable />
      </Card>
    </div>
  );
}
