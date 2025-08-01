import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseAuth } from "@/firebase/auth";
import { usePaginatedDocs } from "@/hooks/usePaginatedDocs";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { getCheckoutStateColor } from "@/utils/getStateColor";
import { GetTime } from "@/utils/GetTime";
import { Icon } from "@iconify/react";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function CheckoutTable() {
  const [filters, setFilters] = useState({});
  const { currentUser } = UseAuth();

  const { updateDocument } = useUpdateDocument();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("checkout-requests", filters);

  const handleStatusUpdate = async (request, status) => {
    const updateObj = {
      status,
      decisionDate: Timestamp.now(),
      decisionBy: {
        name: currentUser?.name,
        email: currentUser?.email,
      },
    };
    await updateDocument(request?.id, "checkout-requests", updateObj);
    let inventoryUpdateObj;
    if (status == "approved") {
      inventoryUpdateObj = {
        checkedOutBy: {
          name: request?.requestBy?.name,
          email: request?.requestBy?.email,
        },
        status: "checked out",
      };
    } else {
      inventoryUpdateObj = {
        checkedOutBy: null,
        status: "checked in",
      };
    }
    const inventoryId = request?.inventory?.id;
    await updateDocument(inventoryId, "inventories", inventoryUpdateObj);
    await refetch();
  };
  if (currentUser?.role === "team") {
    return (
      <div>
        <h1 className="text-2xl font-medium my-4">Checkout Request List</h1>
        <div className="min-h-[50vh]">
          <Table className="w-full text-[1rem]">
            <TableCaption>A list of checkout request</TableCaption>
            <TableHeader className="bg-gray-200/55 !rounded-lg">
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Requested By</TableHead>

                <TableHead>Needed from</TableHead>
                <TableHead>Needed to</TableHead>
                {/* <TableHead>Message</TableHead>
                <TableHead>Status</TableHead> */}
                <TableHead>Admin Decision</TableHead>
                {/* <TableHead>Action</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((request, id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <div>
                      <h5 className="text-wrap capitalize">
                        {request?.inventory?.name}{" "}
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

                  <TableCell>{request?.requestBy?.email}</TableCell>

                  <TableCell>
                    {GetTime(request.neededFrom)}

                    {/* <p className=" text-gray-500 text-center font-medium">-To-</p>
                {GetTime(request.neededTo)} */}
                  </TableCell>
                  <TableCell>{GetTime(request.neededTo)}</TableCell>
                  <TableCell>
                    {request?.decisionBy ? (
                      <div className="flex flex-col">
                        <span>{GetTime(request.decisionDate)}</span>
                        <span>{request?.decisionBy?.name}</span>
                      </div>
                    ) : (
                      "Decision Pending"
                    )}
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
  return (
    <div>
      <TableTopper
        heading="Checkout Request List"
        selectPlaceholder="Select status"
        selectlist={["Pending", "Approved", "Rejected"]}
        onSearch={(e) => setFilters({ nestedSearch: e.toLowerCase() })}
        onSelect={(e) => setFilters({ status: e })}
      />
      <div className="min-h-[50vh]">
        <Table className="w-full text-[1rem]">
          <TableCaption>A list of checkout request</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead>Requested By</TableHead>

              <TableHead>Needed from</TableHead>
              <TableHead>Needed to</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admin Decision</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((request, id) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <div>
                    <h5 className="text-wrap capitalize">
                      {request?.inventory?.name}{" "}
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

                <TableCell>{request?.requestBy?.email}</TableCell>

                <TableCell>
                  {GetTime(request.neededFrom)}

                  {/* <p className=" text-gray-500 text-center font-medium">-To-</p>
                {GetTime(request.neededTo)} */}
                </TableCell>
                <TableCell>{GetTime(request.neededTo)}</TableCell>
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
                <TableCell className={getCheckoutStateColor(request.status)}>
                  <SelectInput
                    className="w-34 capitalize"
                    selectPlaceholder="change access"
                    onSelect={(value) => handleStatusUpdate(request, value)}
                    selectlist={["pending", "approved", "rejected"]}
                    defaultValue={request?.status}
                  />
                </TableCell>
                <TableCell>
                  {request?.decisionBy ? (
                    <div className="flex flex-col">
                      <span>{GetTime(request.decisionDate)}</span>
                      <span>{request?.decisionBy?.name}</span>
                    </div>
                  ) : (
                    "Decision Pending"
                  )}
                </TableCell>

                <TableCell>
                  <div className="w-fit mx-auto">
                    <DeleteModal
                      id={request.id}
                      collectionName="checkout-requests"
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
