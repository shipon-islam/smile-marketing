import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { Icon } from "@iconify/react";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function InternalUsersTable() {
  const [filters, setFilters] = useState({});
  const { updateDocument } = useUpdateDocument();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("users", filters);

  const handleRoleUpdate = async (id, role) => {
    await updateDocument(id, "users", { role: role });
    await refetch();
  };
  return (
    <div>
      <TableTopper
        heading="Internal Users"
        selectPlaceholder="Select role"
        selectlist={["Admin", "Team", "Guest"]}
        onSearch={(e) => setFilters({ search: e.toLowerCase() })}
        onSelect={(e) => setFilters({ role: e })}
      />
      <div className="min-h-[60vh]">
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
            {items?.map((user, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium text-wrap capitalize">
                  {user.name}
                </TableCell>
                {/* <TableCell>{request.clientName}</TableCell> */}
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>
                  <SelectInput
                    selectPlaceholder="change access"
                    onSelect={(value) => handleRoleUpdate(user.id, value)}
                    selectlist={["admin", "team", "guest"]}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <DeleteModal
                      id={user.id}
                      collectionName="users"
                      refetch={refetch}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          {items && items.length < 1 && (
            <p className="text-xl font-bold text-center mt-40">
              There is no users
            </p>
          )}
          {loading && (
            <div className="text-xl font-bold text-center mt-40 w-fit mx-auto flex gap-4">
              <Icon
                icon="eos-icons:bubble-loading"
                className="text-blue-500"
                width="32"
                height="32"
              />
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-8 w-fit ml-auto">
        <Button
          className="cursor-pointer"
          onClick={prevPage}
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Button
          className="cursor-pointer"
          onClick={nextPage}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
