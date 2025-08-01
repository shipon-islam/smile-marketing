import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerInput({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={"bg-[#F1F2F4] flex w-full  min-h-11"}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}

          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(day) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            day.setHours(0, 0, 0, 0);
            return day < today;
          }}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
