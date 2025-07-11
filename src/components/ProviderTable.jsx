import ScrollArea from "../components/ScrollArea";
const inventories = [
  {
    id: 1,
    name: "Joshua R.",
    email: "contact@acme.com",
    phone: "(555) 123-4567",
    company: "acme corp",
    specialty: "construction",
    tags: ["web", "ai", "tech", "dev"],
  },
  {
    id: 2,
    name: "Linda m.",
    email: "info@techsolution.exa",
    phone: "(555) 123-4567",
    company: "tech Solutions, LLC",
    specialty: "iT services",
    tags: ["web", "ai", "tech", "dev"],
  },
  {
    id: 3,
    name: "William G.",
    email: "info@techsolution.exa",
    phone: "(555) 123-4567",
    company: "tech Solutions, LLC",
    specialty: "construction",
    tags: ["web", "ai", "tech", "dev"],
  },
  {
    id: 4,
    name: "Emily S.",
    email: "info@techsolution.exa",
    phone: "(555) 123-4567",
    company: "tech Solutions, LLC",
    specialty: "iT services",
    tags: ["web", "ai", "tech", "dev"],
  },
];
export default function ProviderTable() {
  return (
    <ScrollArea className="max-h-[35rem] overflow-x-auto w-full max-w-[700px] xl:max-w-full">
      <table className=" text-left rtl:text-right w-fit  table-auto max-w-[1200px] hidden xl:block capitalize border border-gray-200 rounded-lg">
        <thead className="capitalize bg-lightGray ">
          <tr>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              company
            </th>
            <th scope="col" className="px-6 py-3">
              contact info
            </th>
            <th scope="col" className="px-6 py-3">
              specialty
            </th>
            <th scope="col" className="px-6 py-3">
              tags
            </th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((provider) => (
            <tr
              key={provider.id}
              className="bg-white border-b  border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {provider.name}
              </td>
              <td className="px-6 py-4 ">{provider.company}</td>
              <td className="px-6 py-4 flex flex-col gap-1.5">
                <span>{provider.email}</span>
                <span>{provider.phone}</span>
              </td>
              <td className="px-6 py-4 ">{provider.specialty}</td>
              <td className="px-6 py-4 flex gap-x-4">
                {provider.tags.map((tag, index) => (
                  <span
                    className="bg-light p-2 rounded-lg text-gray-400 text-sm"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full xl:hidden">
        <ul>
          {inventories.map((provider) => (
            <li className="border border-gray-100 rounded-md p-5 sm:p-8 capitalize mb-3 text-lg md:text-base w-[500px] sm:w-full">
              <div className="table-item  pb-2">
                <h5 className="font-medium">name</h5>
                <div>{provider.name}</div>
              </div>
              <div className="table-item">
                <h5 className="font-medium ">Company</h5>

                <div>{provider.company}</div>
              </div>

              <div className="table-item">
                <h5 className="font-medium">Contact Info</h5>

                <div className="flex flex-col">
                  <span>{provider.email}</span>
                  <span>{provider.phone}</span>
                </div>
              </div>

              <div className="table-item">
                <h5 className="font-medium">Specialty</h5>

                <div>{provider.specialty}</div>
              </div>
              <div className="table-item">
                <h5 className="font-medium">Tags</h5>
                <div className="flex gap-4 ">
                  {provider.tags.map((tag, index) => (
                    <span
                      className="bg-light p-2 rounded-lg text-gray-400 text-sm"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
