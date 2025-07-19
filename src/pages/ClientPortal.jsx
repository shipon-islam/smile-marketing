import ProductCard from "@/components/ProductCard";
import SelectBox from "@/components/SelectBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inventoryList } from "@/constants/inventory";
import { Icon } from "@iconify/react";
import MultiSelect from "../components/MultiSelect";

export default function ClientPortal() {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
      <div className="mb-8 flex justify-between flex-col sm:flex-row gap-y-4">
        <div className="text-lg font-medium text-gray-400">{`Category > All`}</div>
        <div className="flex gap-x-3">
          <MultiSelect
            onSelect={(selectedValue) => {
              console.log(selectedValue);
            }}
            placeholder="location"
            items={["Storage room", "Audio lab", "Conference Room"]}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="flex gap-x-0.5 rounded-md border border-gray-300 px-2.5 py-1.5 cursor-pointer">
                <Icon icon="lets-icons:filter" width="24" height="24" />
                <span>Filter</span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-4">
              <div className="border-b border-gray-300 pb-2">
                <h4 className="text-lg sm:text-base">Advance Filter</h4>
                <p className="text-xs">
                  Refine your search with specific filters
                </p>
              </div>
              <div className="mt-3">
                <SelectBox
                  onSelect={(value) => console.log(value)}
                  label="Category"
                  items={["Electronic", "Plastic"]}
                />
                <SelectBox
                  onSelect={(value) => console.log(value)}
                  label="Price"
                  items={["above $100", "below $5000"]}
                />
                <SelectBox
                  onSelect={(value) => console.log(value)}
                  label="Location"
                  items={["Storage room", "Audio lab", "Conference Room"]}
                />
                <div className="flex gap-x-5 justify-end mt-6 sm:text-sm">
                  <button className="flex items-center gap-x-0.5 border border-gray-300 py-1 px-3 rounded-md  cursor-pointer hover:bg-light">
                    <Icon icon="ix:reset" width="20" height="20" />
                    <span>Reset</span>
                  </button>
                  <button className="flex gap-x-1 items-center border border-gray-300 py-1 px-3 rounded-md   cursor-pointer hover:bg-light">
                    <Icon icon="streamline:send-email" width="15" height="15" />
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-4 md:gap-6 xl:gap-8 2xl:grid-cols-4 ">
        {inventoryList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
