import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Notification from "../Notification";
export default function NotificationBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <div className="relative ">
          <Icon
            icon="carbon:notification-filled"
            width="35"
            height="35"
            className="size-[30px]"
          />
          <span className="absolute -top-2 -right-1.5 bg-blue-500 px-2 py-0.5 rounded-full text-xs text-white ">
            1
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-full w-96 " align="end">
        <Notification />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
