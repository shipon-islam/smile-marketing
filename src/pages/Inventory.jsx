import SummaryBox from "../components/SummaryBox";
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
];
export default function Inventory() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-5">
        <SummaryBox
          title="items in storage"
          amount="$250,000"
          items="300 items"
        />
        <SummaryBox
          title="items checked out"
          amount="$11,500"
          items="105 items"
        />
      </div>
      <div className="grid lg:grid-cols-[3fr_1fr] gap-x-5 mt-8">
        <div className="bg-white px-5 py-6 rounded-md">
          <h1 className="font-semibold text-2xl capitalize">
            internal inventory
          </h1>

          <div class="relative overflow-x-auto mt-8">
            <table class="w-full text-left rtl:text-right  ">
              <thead class="capitalize bg-lightGray">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    item
                  </th>
                  <th scope="col" class="px-6 py-3">
                    price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    person assigned
                  </th>
                  <th scope="col" class="px-6 py-3">
                    brand
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((inventory) => (
                  <tr class="bg-white border-b  border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <img
                        src={inventory.image}
                        alt={inventory.name}
                        className="max-h-[93px] max-w-[109px] w-full h-full object-cover"
                      />
                      {inventory.name}
                    </th>
                    <td class="px-6 py-4">{inventory.price}</td>
                    <td class="px-6 py-4">{inventory.location}</td>
                    <td class="px-6 py-4">{inventory.person_assigned}</td>
                    <td class="px-6 py-4">{inventory.brand}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white px-5 py-6 rounded-md">
          <h4 className="font-semibold capitalize text-xl">
            pending checkouts
          </h4>
        </div>
      </div>
    </div>
  );
}
