import { product_list } from "../constants/product";
export default function ClientPortal() {
  return (
    <div className="bg-white rounded-lg p-8">
      <div className="mb-8">
        <div className="text-xl">{`Category > All`}</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:grid-cols-4 ">
        {product_list.map((product) => (
          <div
            key={product.id}
            className="p-3 border border-gray-200 rounded-md"
          >
            <img src={product.image} alt="a" />
            <div>
              <h5>$1,200</h5>
              <h4>MacBook Air</h4>
              <p>New york</p>
              <button className="bg-deepBlue w-full text-gray-300 py-1.5 rounded-md">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
