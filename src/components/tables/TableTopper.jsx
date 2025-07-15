import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
export default function TableTopper({
  heading,
  isSelect = true,
  selectlist,
  selectPlaceholder,
  onSearch,
  onSelect,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 w-full max-w-full gap-y-4">
      <h1 className="font-medium text-2xl capitalize mb-5">{heading}</h1>
      <div className="flex flex-col-reverse items-end md:flex-row gap-4">
        {isSelect && (
          <Select onValueChange={onSelect}>
            <SelectTrigger className="w-full sm:w-[180px] text-lg md:text-[1rem]">
              <SelectValue placeholder={selectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {selectlist?.map((item, index) => (
                <SelectItem
                  className="text-lg md:text-[1rem]"
                  key={index}
                  value={item.toLowerCase()}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex py-1.5 px-3 border border-gray-300 rounded-lg w-full">
          <input
            className="border-none outline-none w-full h-full block md:text-sm"
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="cursor-pointer">
            <Icon
              icon="iconamoon:search-bold"
              width="20"
              height="20"
              className="text-gray-300 size-[25px] md:size-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
