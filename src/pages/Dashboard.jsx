import Card from "@/components/Card";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { ChartBarDefault } from "./BarChart";
import { ChartPieDonutText } from "./ChartPieDonutText";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl mt-8 sm:mt-4 sm:text-2xl font-medium mb-4 pl-2 flex gap-2 items-center">
        <span>Shortcut Links</span>
        <Icon icon="solar:arrow-right-linear" width="24" height="24" />
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <Card>
          <Link
            to="/inventory"
            className="flex flex-col items-center justify-center dashboard group"
          >
            <Icon
              className="text-[#062583] group-hover:text-blue-500 size-16 md:size-auto hoverEffect"
              icon="fluent-mdl2:product-variant"
              width="100"
              height="100"
            />
            <div>
              <h2 className="text-lg md:text-xl font-medium mt-4 group-hover:text-blue-500 hoverEffect">
                Inventory
              </h2>
            </div>
          </Link>
        </Card>
        <Card>
          <Link
            to="/password"
            className="flex flex-col items-center justify-center group"
          >
            <Icon
              className="text-[#062583] group-hover:text-blue-500 size-16 md:size-auto hoverEffect"
              icon="streamline-plump:password-lock-remix"
              width="100"
              height="100"
            />
            <div>
              <h2 className="text-lg md:text-xl font-medium mt-8 sm:mt-4 group-hover:text-blue-500 hoverEffect">
                Password
              </h2>
            </div>
          </Link>
        </Card>
        <Card>
          <Link
            to="/internal-users"
            className="flex flex-col items-center justify-center group"
          >
            <Icon
              className="text-[#062583] group-hover:text-blue-500 size-16 md:size-auto hoverEffect"
              icon="fa:users"
              width="100"
              height="100"
            />
            <div>
              <h2 className="text-lg md:text-xl font-medium mt-4 group-hover:text-blue-500 hoverEffect">
                Internal users
              </h2>
            </div>
          </Link>
        </Card>
        <Card>
          <Link
            to="client-portal"
            className="flex flex-col items-center justify-center group"
          >
            <Icon
              className="text-[#062583] group-hover:text-blue-500 size-16 md:size-auto hoverEffect"
              icon="gis:map-users"
              width="100"
              height="100"
            />
            <div>
              <h2 className="text-lg md:text-xl font-medium mt-4 group-hover:text-blue-500 hoverEffect">
                Client Portal
              </h2>
            </div>
          </Link>
        </Card>
      </div>
      <div className="mt-10">
        <h1 className="text-xl sm:text-2xl font-medium mb-4 pl-2 flex gap-2 items-center">
          <span>Visitor Analytics</span>
          <Icon icon="solar:arrow-right-linear" width="24" height="24" />
        </h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <ChartBarDefault /> <ChartPieDonutText />
        </div>
      </div>
    </div>
  );
}
