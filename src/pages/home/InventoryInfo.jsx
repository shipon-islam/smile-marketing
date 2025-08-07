import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

export default function InventoryInfo() {
  const location = useLocation();
  const inventory = location?.state?.inventory;
  return (
    <Layout className="mt-10">
      <Card className=" px-5 sm:px-10 sm:py-10 ">
        <h1 className="font-semibold text-2xl mb-8">Inventory Details -</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="">
            <img
              className="sm:w-[350px] h-auto"
              src={inventory?.imageUrl}
              alt="inventory"
            />
          </div>
          <ul className="capitalize space-y-2 lg:text-lg border-l border-gray-300 pl-8 overflow-hidden">
            <li>
              <strong>Name</strong> :{inventory?.name}
            </li>
            <li>
              <strong>Category</strong> : {inventory?.category}
            </li>
            <li>
              <strong>Brand</strong> : {inventory?.brand}
            </li>
            <li>
              <strong>Price</strong> : {inventory?.price}
            </li>
            <li>
              <strong>Location</strong> : {inventory?.location}
            </li>
            <li>
              <strong>Available stock</strong> : {inventory?.stock}
            </li>

            <li>
              <strong>Contact_link</strong> :
              <a
                className="text-blue-500 hover:underline text-wrap"
                href={inventory?.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inventory?.contactLink}
              </a>
            </li>
          </ul>
        </div>
        <Link
          to="/client-request-form"
          state={{ inventory: inventory }}
          className="bg-deepBlue  text-gray-300 py-1.5 rounded-md mt-4 cursor-pointer  text-center font-medium w-fit px-8 sm:ml-auto"
        >
          {inventory.sellingType == "rent" ? "Rent" : "Purchase"}
        </Link>
      </Card>
    </Layout>
  );
}
