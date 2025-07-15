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

import { inventoryList } from "@/constants/inventory";
import { getInventoryStateColor } from "@/utils/getStateColor";
import { Icon } from "@iconify/react";
import TableTopper from "./TableTopper";
export default function CheckoutTable() {
  return (
    <div>
      <TableTopper
        heading="Internal inventory"
        selectPlaceholder="Select status"
        selectlist={["Checked In", "Checked Out"]}
        onSearch={(e) => console.log(e)}
        onSelect={(e) => console.log(e)}
      />
      <Table className="w-full text-[1rem]">
        <TableCaption>A list of checkout request</TableCaption>
        <TableHeader className="bg-gray-200/55 !rounded-lg">
          <TableRow>
            <TableHead className="min-w-[200px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>CheckedOutBy</TableHead>
            <TableHead>Visible Clients</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryList.map((inventory) => (
            <TableRow key={inventory.id}>
              <TableCell className="font-medium">
                <div>
                  <img
                    src={inventory.image}
                    alt={inventory.name}
                    className="max-h-[93px] max-w-[109px] w-full h-full object-cover"
                  />
                  {inventory.name}
                </div>
              </TableCell>
              <TableCell>{inventory.category}</TableCell>
              <TableCell>{inventory.brand}</TableCell>
              <TableCell>${inventory.price}</TableCell>

              <TableCell>{inventory.location}</TableCell>
              <TableCell className="text-center">
                {inventory.stock < 10 ? "0" + inventory.stock : inventory.stock}
              </TableCell>
              <TableCell className={getInventoryStateColor(inventory.status)}>
                {inventory.status}
              </TableCell>
              <TableCell className="text-center">
                {inventory.checkedOutBy ? (
                  <div className="flex flex-col">
                    <span>{inventory.checkedOutBy}</span>
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <div className="mx-auto w-fit ">
                  <Switch className="cursor-pointer" />
                </div>
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
