import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { providers } from "@/constants/provider";
import { Icon } from "@iconify/react";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function ProviderTable() {
  return (
    <div>
      <TableTopper
        isSelect={false}
        heading="Provider List"
        selectPlaceholder="Select role"
        selectlist={["Admin", "Team", "Guest"]}
        onSearch={(e) => console.log(e)}
        onSelect={(e) => console.log(e)}
      />
      <Table className="w-full text-[1rem] ">
        <TableCaption>A list of providers</TableCaption>
        <TableHeader className="bg-gray-200/55 !rounded-lg">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Contact info</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              {/* <TableCell>{request.clientName}</TableCell> */}
              <TableCell>{provider.company}</TableCell>
              <TableCell>
                {provider.email}
                <br />
                {provider.phone}
              </TableCell>

              <TableCell>{provider.specialty}</TableCell>
              <TableCell>
                <div className="flex gap-x-1.5">
                  {provider.tags.map((tag, index) => (
                    <span
                      className="bg-light p-2 rounded-lg text-gray-400 text-sm"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-x-3">
                  <DeleteModal />
                  <button className="text-green-400 cursor-pointer">
                    <Icon icon="akar-icons:edit" width="24" height="24" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
