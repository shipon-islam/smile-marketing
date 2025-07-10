import ScrollArea from "../components/ScrollArea";
const inventories = [
  {
    id: 1,
    name: "macBook pro",
    image: "/images/products/laptop.jpg",
    price: "$1200",
    location: "new york",
    person_assigned: "john doe",
    brand: "apple",
  },
  {
    id: 2,
    name: "projector",
    image: "/images/products/projector.jpg",
    price: "$600",
    location: "virginia",
    person_assigned: "alex root",
    brand: "asus",
  },
  {
    id: 3,
    name: "sony camera",
    image: "/images/products/camera.jpg",
    price: "$1500",
    location: "florida",
    person_assigned: "l messi",
    brand: "sony",
  },
  {
    id: 4,
    name: "sony camera",
    image: "/images/products/camera.jpg",
    price: "$1500",
    location: "florida",
    person_assigned: "l messi",
    brand: "sony",
  },
  {
    id: 5,
    name: "sony camera",
    image: "/images/products/camera.jpg",
    price: "$1500",
    location: "florida",
    person_assigned: "l messi",
    brand: "sony",
  },
  {
    id: 6,
    name: "sony camera",
    image: "/images/products/camera.jpg",
    price: "$1500",
    location: "florida",
    person_assigned: "l messi",
    brand: "sony",
  },
];
export default function InventoryTable() {
  return (
    <ScrollArea className="max-h-[35rem] overflow-x-auto">
      <table className="w-full text-left rtl:text-right  table-auto hidden xl:block capitalize ">
        <thead className="capitalize bg-lightGray">
          <tr>
            <th scope="col" className="px-6 py-3">
              item
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
            <th scope="col" className="px-6 py-3">
              location
            </th>
            <th scope="col" className="px-6 py-3">
              person assigned
            </th>
            <th scope="col" className="px-6 py-3">
              brand
            </th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr
              key={inventory.id}
              className="bg-white border-b  border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                <img
                  src={inventory.image}
                  alt={inventory.name}
                  className="max-h-[93px] max-w-[109px] w-full h-full object-cover"
                />
                {inventory.name}
              </td>
              <td className="px-6 py-4 ">{inventory.price}</td>
              <td className="px-6 py-4 ">{inventory.location}</td>
              <td className="px-6 py-4 ">{inventory.person_assigned}</td>
              <td className="px-6 py-4 ">{inventory.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full xl:hidden">
        <ul>
          {inventories.map((inventory) => (
            <li className="border border-gray-100 rounded-md p-5 sm:p-8 capitalize mb-3 text-lg md:text-base">
              <div className="table-item border-b border-gray-100 pb-2">
                <h5 className="font-medium">item</h5>
                <div>
                  <img
                    src={inventory.image}
                    alt={inventory.name}
                    className="max-w-[90px] mx-auto  md:max-h-[93px] md:max-w-[109px] w-full h-full object-cover"
                  />
                  {inventory.name}
                </div>
              </div>
              <div className="table-item">
                <h5 className="font-medium">price</h5>

                <div>{inventory.price}</div>
              </div>

              <div className="table-item">
                <h5 className="font-medium">location</h5>

                <div>{inventory.location}</div>
              </div>

              <div className="table-item">
                <h5 className="font-medium">person assigned</h5>

                <div>{inventory.person_assigned}</div>
              </div>
              <div className="table-item">
                <h5 className="font-medium">brand</h5>
                <div>{inventory.brand}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
