import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-deepBlue h-[80vh] rounded-md px-4 pt-10 mt-2 fixed md:sticky top-[6.5rem] left-0">
      <h5 className="pl-2 font-medium text-xl text-gray-200">
        Admin Dashboard
      </h5>
      <ul className="mt-10 space-y-8">
        {sidebar_links.map((link) => (
          <li>
            <Link
              to={link.url}
              className={`flex items-center gap-x-2 py-2 px-2 rounded-md text-gray-300 transition-colors duration-200  text-lg hover:bg-lightBlue ${
                link.url === pathname ? "bg-lightBlue " : ""
              }`}
            >
              <Icon icon={link.icon} width="24" height="24" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            className={`flex items-center gap-x-2 py-2 px-2 rounded-md text-gray-300 transition-colors duration-200  text-lg hover:bg-lightBlue w-full`}
          >
            <Icon
              icon="material-symbols:logout-rounded"
              width="24"
              height="24"
            />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
const sidebar_links = [
  {
    id: 1,
    url: "/",
    name: "Inventory",
    icon: "mingcute:inventory-line",
  },
  {
    id: 2,
    url: "/password",
    name: "Password",
    icon: "streamline-plump:password-lock-remix",
  },
  {
    id: 3,
    url: "/client-portal",
    name: "Client Portal",
    icon: "solar:user-id-bold",
  },
  {
    id: 4,
    url: "/tickets",
    name: "Tickets",
    icon: "icon-park-outline:tickets-one",
  },
  {
    id: 4,
    url: "/providers",
    name: "Providers",
    icon: "mdi:company",
  },
];
