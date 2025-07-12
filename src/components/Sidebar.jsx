import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {
  const { pathname } = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div
      className={`bg-deepBlue h-[90vh] md:h-[88vh] rounded-md px-4 pt-10 mt-[1px] md:mt-2 fixed lg:sticky lg:top-[6.5rem]  w-4/5 sm:w-3/5 lg:w-64 2xl:w-72 left-0 transition-transform duration-300 z-99 ${
        sidebarToggle ? "translate-x-0" : "-translate-x-[98%] lg:translate-x-0"
      }`}
    >
      <div className="relative ">
        <h5 className="pl-2 font-medium text-xl text-gray-200 ">
          Admin Dashboard
        </h5>
        <ul className="mt-14 space-y-8">
          {sidebar_links.map((link) => (
            <li key={link.id} onClick={() => setSidebarToggle(false)}>
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
        <button
          onClick={() => {
            setSidebarToggle((prev) => !prev);
          }}
          className={`cursor-pointer absolute top-1/2 -right-11  -translate-y-1/2 py-5 px-2 rounded-r-full bg-deepBlue lg:hidden ${
            sidebarToggle ? "opacity-0" : "opacity-100"
          }`}
        >
          <Icon icon="maki:arrow" width="20" height="20" />
        </button>
        <button
          onClick={() => {
            setSidebarToggle((prev) => !prev);
          }}
          className="cursor-pointer absolute -top-4 -right-2.5  p-3 rounded-r-full lg:hidden hover:text-red-500"
        >
          <Icon icon="material-symbols:close" width="28" height="28" />
        </button>
      </div>
    </div>
  );
}
const sidebar_links = [
  {
    id: 1,
    url: "/inventory",
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
    id: 5,
    url: "/providers",
    name: "Providers",
    icon: "mdi:company",
  },
];
