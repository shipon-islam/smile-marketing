import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useNotificationCount from "@/hooks/useNotificationCount";
import { Icon } from "@iconify/react";
import Notification from "./Notification";
export default function NotificationBar() {
  const { notify } = useNotificationCount();

  return (
    <DropdownMenu onClick={() => console.log("clicked")}>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <div className="relative ">
          <Icon
            icon="carbon:notification-filled"
            width="35"
            height="35"
            className="size-[30px]"
          />
          <span className="absolute -top-2 -right-1.5 bg-blue-500 px-2 py-0.5 rounded-full text-xs text-white ">
            {notify.length}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen sm:w-96 " align="end">
        <Notification notify={notify} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
