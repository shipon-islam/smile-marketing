import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientRequestList } from "@/constants/client_request";
import { getClientStateColor } from "@/utils/getStateColor";
import { GetTime } from "@/utils/GetTime";
import { Icon } from "@iconify/react";
import TableTopper from "./TableTopper";
export default function ClientRequestTable() {
  return (
    <div>
      <TableTopper
        heading="Client Request List"
        selectPlaceholder="Select status"
        selectlist={["New", "In_progress", "Completed"]}
        onSearch={(e) => console.log(e)}
        onSelect={(e) => console.log(e)}
      />
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
          {clientRequestList.map((request, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                <div>
                  <h5>{request?.inventoryRef?.name}</h5>
                  <div className="text-sm space-y-1 mt-1">
                    <p className="flex gap-1">
                      <span className="font-normal">Band:</span>
                      <span className="font-light">
                        {request?.inventoryRef?.brand}
                      </span>
                    </p>
                    <p className="flex gap-1">
                      <span className="font-normal">Category:</span>
                      <span className="font-light">
                        {request?.inventoryRef?.category}
                      </span>
                    </p>
                  </div>
                </div>
              </TableCell>
              {/* <TableCell>{request.clientName}</TableCell> */}
              <TableCell>
                {request.clientName}
                <br /> {request.clientEmail}
              </TableCell>
              <TableCell>{request.message.slice(0, 20)}...</TableCell>
              <TableCell className={getClientStateColor(request.status)}>
                {request.status}
              </TableCell>
              <TableCell>{GetTime(request.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-x-3">
                  <button className="text-red-400 cursor-pointer">
                    <Icon
                      icon="material-symbols:delete"
                      width="24"
                      height="24"
                    />
                  </button>
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
