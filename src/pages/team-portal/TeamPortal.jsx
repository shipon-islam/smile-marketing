import ProductCard from "@/components/ProductCard";
import SelectBox from "@/components/SelectBox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetCatBrandLoc from "@/hooks/useGetCatBrandLoc";
import { UseInventory } from "@/providers/InventoryProvider";
import { Icon } from "@iconify/react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import MultiSelect from "../../components/MultiSelect";

export default function TeamPortal() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const { locations, categories } = useGetCatBrandLoc();
  const { items, loading, nextPage, prevPage, hasNext, hasPrev, setFilters } =
    UseInventory();
  const handleSubmit = () => {
    setFilters({
      category: category,
      price: price,
      location: location,
    });
  };
  const handleReset = () => {
    setFilters({
      category: "",
      price: "",
      location: "",
    });
    setLocation("");
    setCategory("");
    setPrice("");
  };
  useEffect(() => {
    handleReset();
  }, []);
  return (
    <>
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 min-h-[80vh]">
        <div className="mb-8 flex justify-between flex-col sm:flex-row gap-y-4">
          <div className="text-lg font-medium text-gray-400">{`Category > All`}</div>
          <div className="flex gap-x-3">
            <MultiSelect
              onSelect={(selectedValue) => {
                setFilters({ location: selectedValue });
              }}
              placeholder="location"
              items={locations.map((location) => location.slug)}
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
                    onSelect={(value) => setCategory(value)}
                    label="Category"
                    items={categories.map((category) => category.slug)}
                  />
                  <SelectBox
                    onSelect={(value) => setPrice(value)}
                    label="Price"
                    items={["below $1000", "above $1000"]}
                  />
                  <SelectBox
                    onSelect={(value) => setLocation(value)}
                    label="Location"
                    items={locations.map((location) => location.slug)}
                  />
                  <div className="flex gap-x-5 justify-end mt-6 sm:text-sm">
                    <DropdownMenuItem>
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-x-0.5 border border-gray-300 py-1 px-3 rounded-md  cursor-pointer hover:bg-light"
                      >
                        <Icon icon="ix:reset" width="20" height="20" />
                        <span>Reset</span>
                      </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <button
                        onClick={handleSubmit}
                        className="flex gap-x-1 items-center border border-gray-300 py-1 px-3 rounded-md   cursor-pointer hover:bg-light"
                      >
                        <Icon
                          icon="streamline:send-email"
                          width="15"
                          height="15"
                        />
                        <span>Submit</span>
                      </button>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4 md:gap-6 xl:gap-8 2xl:grid-cols-4 ">
          {items?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
      <div className="flex gap-8 w-fit ml-auto py-8">
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
    </>
  );
}
