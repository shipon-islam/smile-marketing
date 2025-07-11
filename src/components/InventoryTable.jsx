import ScrollArea from "../components/ScrollArea";
import { product_list } from "../constants/product";

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
          {product_list.map((inventory) => (
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
          {product_list.map((inventory) => (
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
