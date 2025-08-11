import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UseAuth } from "@/firebase/auth";
import { Link } from "react-router-dom";

export default function HeaderAvatar() {
  const { currentUser, logout } = UseAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-11 h-11 cursor-pointer border border-gray-400">
          <AvatarImage src={currentUser?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 sm:w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {(currentUser?.role === "admin" || currentUser?.role === "team") && (
          <DropdownMenuGroup>
            <Link to="/dashboard/profile">
              <DropdownMenuItem className="cursor-pointer">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link to="/dashboard/inventory">
              <DropdownMenuItem className="cursor-pointer">
                Dashdoard
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        {currentUser ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => await logout()}
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <Link to="/login">
            <DropdownMenuItem className="cursor-pointer">
              Login
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
