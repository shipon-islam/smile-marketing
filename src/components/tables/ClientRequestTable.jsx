import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { getClientStateColor } from "@/utils/getStateColor";
import { GetTime } from "@/utils/GetTime";
import { Icon } from "@iconify/react";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function ClientRequestTable() {
  const [filters, setFilters] = useState({});
  const { updateDocument } = useUpdateDocument();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("client-requests", filters);
  const handleStatusUpdate = async (id, status) => {
    await updateDocument(id, "client-requests", { status });
    await refetch();
  };
  return (
    <div>
      <TableTopper
        heading="Client Request List"
        selectPlaceholder="Select status"
        selectlist={["New", "In_progress", "Completed"]}
        onSearch={(e) => setFilters({ nestedSearch: e })}
        onSelect={(e) => setFilters({ status: e })}
      />
      <div className="min-h-[60vh]">
        <Table className="w-full text-[1rem]">
          <TableCaption>A list of client request</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead>Client info</TableHead>

              <TableHead>Message Snippet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((request, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <div>
                    <h5 className="text-wrap capitalize">
                      {request?.inventory?.name}
                    </h5>
                    <div className="text-sm space-y-1 mt-1">
                      <p className="flex gap-1">
                        <span className="font-normal">Band:</span>
                        <span className="font-light">
                          {request?.inventory?.brand}
                        </span>
                      </p>
                      <p className="flex gap-1">
                        <span className="font-normal">Category:</span>
                        <span className="font-light">
                          {request?.inventory?.category}
                        </span>
                      </p>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell>{request.clientName}</TableCell> */}
                <TableCell>
                  {request.name}
                  <br /> {request.email}
                </TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer hover:underline">
                      {request.message.slice(0, 20)}...
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p className="text-sm">{request?.message}</p>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell className={getClientStateColor(request.status)}>
                  <SelectInput
                    className="w-34 capitalize"
                    selectPlaceholder="change access"
                    onSelect={(value) => handleStatusUpdate(request.id, value)}
                    selectlist={["new", "in_progress", "completed"]}
                    defaultValue={request.status}
                  />
                </TableCell>
                <TableCell>{GetTime(request.createdAt)}</TableCell>
                <TableCell className="w-[20px]">
                  <div className="flex items-center justify-center gap-x-3">
                    <DeleteModal
                      id={request.id}
                      collectionName={"client-requests"}
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
              There is no items
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
