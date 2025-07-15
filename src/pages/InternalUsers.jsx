import Card from "@/components/Card";
import SummaryBox from "@/components/SummaryBox";
import InternalUsersTable from "@/components/tables/InternalUsersTable";

export default function InternalUsers() {
  return (
    <div className="w-full lg:w-[68vw] xl:w-[72vw] 2xl:lg:w-full">
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8 w-full">
        <SummaryBox
          title="internal admin"
          items="5 person"
          icon="material-symbols:tab-new-right-outline"
        />
        <SummaryBox
          title="internal Team"
          items="10 person"
          icon="mage:box-3d-check"
        />
        <SummaryBox
          title="internal guest"
          items="2 person"
          icon="mage:box-3d-check"
        />
      </div>
      <Card>
        <InternalUsersTable />
      </Card>
    </div>
  );
}
