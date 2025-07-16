import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { internal_users } from "@/constants/internal_users";
import SelectInput from "../SelectInput";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function InternalUsersTable() {
  return (
    <div>
      <TableTopper
        heading="Internal Users"
        selectPlaceholder="Select role"
        selectlist={["Admin", "Team", "Guest"]}
        onSearch={(e) => console.log(e)}
        onSelect={(e) => console.log(e)}
      />
      <Table className="w-full text-[1rem]">
        <TableCaption>A list of internal user</TableCaption>
        <TableHeader className="bg-gray-200/55 !rounded-lg">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internal_users.map((user, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{user.displayName}</TableCell>
              {/* <TableCell>{request.clientName}</TableCell> */}
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell>
                <SelectInput
                  selectPlaceholder="change access"
                  onSelect={() => {}}
                  selectlist={["admin", "team", "guest"]}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-x-3">
                  <DeleteModal />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
