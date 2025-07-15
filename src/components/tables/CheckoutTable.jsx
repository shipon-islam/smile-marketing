import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkoutRequests } from "@/constants/chechout_request";
import { getCheckoutStateColor } from "@/utils/getStateColor";
import { GetTime } from "@/utils/GetTime";
import { Icon } from "@iconify/react";
import TableTopper from "./TableTopper";
export default function CheckoutTable() {
  return (
    <div>
      <TableTopper
        heading="Checkout Request List"
        selectPlaceholder="Select status"
        selectlist={["Pending", "Approved", "Rejected"]}
        onSearch={(e) => console.log(e)}
        onSelect={(e) => console.log(e)}
      />
      <Table className="w-full text-[1rem]">
        <TableCaption>A list of checkout request</TableCaption>
        <TableHeader className="bg-gray-200/55 !rounded-lg">
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>status</TableHead>
            <TableHead>Needed from</TableHead>
            <TableHead>Needed to</TableHead>
            <TableHead>Admin Decision</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkoutRequests.map((request, id) => (
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

              <TableCell>{request.requestedBy}</TableCell>
              <TableCell className={getCheckoutStateColor(request.status)}>
                {request.status}
              </TableCell>
              <TableCell>{GetTime(request.neededFrom)}</TableCell>
              <TableCell>{GetTime(request.neededTo)}</TableCell>
              <TableCell>
                {request?.adminDecisionBy ? (
                  <div className="flex flex-col">
                    <span>{GetTime(request.decisionDate)}</span>
                    <span>{request.adminDecisionBy}</span>
                  </div>
                ) : (
                  "Decision Pending"
                )}
              </TableCell>

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
