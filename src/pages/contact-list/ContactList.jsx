import ContactsTable from "@/components/tables/ContactsTable";

export default function ContactList() {
  return (
    <div>
      <div className="mt-8">
        <div className="mt-4">
          <div className={`bg-white px-3 sm:px-5 py-6 rounded-md shadow`}>
            <ContactsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
