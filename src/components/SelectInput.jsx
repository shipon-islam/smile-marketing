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
  className,
  ...rest
}) {
  return (
    <Select {...rest} onValueChange={onSelect}>
      <SelectTrigger className={`w-[180px] ${className}`}>
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
