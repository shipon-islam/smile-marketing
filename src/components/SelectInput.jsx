import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SelectInput({
  selectlist,
  selectPlaceholder,
  onSelect,
}) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {selectlist?.map((item, index) => (
          <SelectItem key={index} value={item.toLowerCase()}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
