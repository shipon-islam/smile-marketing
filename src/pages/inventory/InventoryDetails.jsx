import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

export default function InventoryDetails() {
  const location = useLocation();
  const inventory = location?.state?.inventory;
  return (
    <div>
      <Card className=" px-5 sm:px-10 sm:py-10">
        <h1 className="font-semibold text-2xl mb-8">Inventory Details -</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="">
            <img
              className="sm:w-[350px] h-auto"
              src={inventory?.imageUrl}
              alt="inventory"
            />
          </div>
          <ul className="capitalize space-y-2 lg:text-lg border-l border-gray-300 pl-8">
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
              <strong>Status</strong> : {inventory?.status}
            </li>
            <li>
              <strong>Location</strong> : {inventory?.location}
            </li>
            <li>
              <strong>Available stock</strong> : {inventory?.stock}
            </li>
            <li>
              <strong>Selling_Type</strong> : {inventory?.sellingType}
            </li>
            <li>
              <strong>Contact_link</strong> :
              <a
                className="text-blue-500 hover:underline"
                href={inventory?.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inventory?.contactLink}
              </a>
            </li>
            <li>
              <strong>Visible_Client_Page</strong> :{" "}
              {inventory?.isVisibleToClients ? "Yes" : "No"}
            </li>
            <li>
              <strong>Tags</strong> :{" "}
              {inventory?.tags.map((item) => item + ",")}
            </li>
            {inventory?.checkedOutBy && (
              <li>
                <strong>CheckoutBy</strong> : {inventory?.checkedOutBy?.name}
              </li>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
