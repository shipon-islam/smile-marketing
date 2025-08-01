import { Switch } from "@/components/ui/switch";
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
import { getInventoryStateColor } from "@/utils/getStateColor";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";
import TableTopper from "./TableTopper";
export default function InventoryTable() {
  const [filters, setFilters] = useState({});
  const { updateDocument } = useUpdateDocument();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, refetch } =
    usePaginatedDocs("inventories", filters);

  const handleVisibleClient = async (switchState, id) => {
    await updateDocument(id, "inventories", {
      isVisibleToClients: switchState,
    });
    await refetch();
  };

  return (
    <div>
      <TableTopper
        heading="Internal inventory"
        selectPlaceholder="Select status"
        selectlist={["Checked In", "Checked Out"]}
        onSearch={(e) => setFilters({ search: e })}
        onSelect={(e) => setFilters({ status: e })}
      />
      <div className="min-h-[60vh]">
        <Table className="w-full text-[1rem] ">
          <TableCaption>A list of checkout request</TableCaption>
          <TableHeader className="bg-gray-200/55 !rounded-lg">
            <TableRow>
              <TableHead className="min-w-[200px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>CheckedOutBy</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Visible Clients</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((inventory) => (
              <TableRow key={inventory.id}>
                <TableCell className="font-medium">
                  <div>
                    <img
                      src={inventory.imageUrl}
                      alt={inventory.name}
                      className="max-h-[93px] max-w-[109px] w-full h-full object-cover"
                    />
                    <p className="text-wrap capitalize">{inventory.name}</p>
                    <div className="text-sm space-y-1 mt-1">
                      <p className="flex gap-1">
                        <span className="font-normal">Band:</span>
                        <span className="font-light">{inventory?.brand}</span>
                      </p>
                      <p className="flex gap-1">
                        <span className="font-normal">Category:</span>
                        <span className="font-light">{inventory.category}</span>
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>${inventory.price}</TableCell>

                <TableCell>{inventory.location}</TableCell>
                <TableCell className="text-center">
                  {inventory.stock < 10
                    ? "0" + inventory.stock
                    : inventory.stock}
                </TableCell>
                <TableCell className={getInventoryStateColor(inventory.status)}>
                  {inventory.status}
                </TableCell>
                <TableCell className="text-center">
                  {inventory?.checkedOutBy ? (
                    <div className="flex flex-col">
                      <span>{inventory?.checkedOutBy?.name}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <a
                    className="text-blue-500 underline"
                    href={inventory.contactLink}
                  >
                    google docs
                  </a>
                </TableCell>
                <TableCell>
                  <div className="mx-auto w-fit ">
                    <Switch
                      checked={inventory.isVisibleToClients}
                      onCheckedChange={(e) =>
                        handleVisibleClient(e, inventory.id)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <Link
                      to={`/dashboard/inventory/${inventory.id}`}
                      className="text-yellow-400 cursor-pointer"
                      state={{ inventory }}
                    >
                      <Icon icon="mdi:eye" width="24" height="24" />
                    </Link>
                    <Link
                      to={`/dashboard/edit-inventory/${inventory.id}`}
                      state={{ inventory }}
                      className="text-green-400 cursor-pointer"
                    >
                      <Icon icon="akar-icons:edit" width="24" height="24" />
                    </Link>
                    <DeleteModal
                      id={inventory.id}
                      collectionName="inventories"
                      imageUrl={inventory.imageUrl}
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
              There is no product
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
