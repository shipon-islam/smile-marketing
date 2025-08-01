import { Link, useLocation } from "react-router-dom";

export default function ProductCard({ product }) {
  const { pathname } = useLocation();
  return (
    <div
      key={product.id}
      className="p-3 border border-gray-200 rounded-md relative min-h-[345px]"
    >
      <img
        className="w-[160px] h-[150px] mx-auto"
        src={product.imageUrl}
        alt={product.name || "product-image"}
      />
      <div className="text-sm space-y-1 mt-2">
        <div className="flex justify-between">
          <h5>${product.price}</h5>
          {product?.sellingType == "rent" ? <span>1 day</span> : "-"}
        </div>

        <h4 className="font-medium capitalize">
          {product?.name.slice(0, 55)}
          {product?.name?.length > 55 ? "..." : ""}
        </h4>
        <p>Stock Available: {product.stock}</p>
        <p className="mb-12">{product.location}</p>

        {pathname !== "/" ? (
          <Link
            to="/dashboard/checkout-request-form"
            state={{ inventory: product }}
            className="bg-deepBlue  text-gray-300 py-1.5 rounded-md mt-4 cursor-pointer  text-center font-medium block w-[90%] absolute bottom-3 left-1/2 -translate-x-1/2"
          >
            Checkout
          </Link>
        ) : (
          <Link
            to="/client-request-form"
            state={{ inventory: product }}
            className="bg-deepBlue  text-gray-300 py-1.5 rounded-md mt-4 cursor-pointer  text-center font-medium block w-[90%] absolute bottom-3 left-1/2 -translate-x-1/2"
          >
            {product.sellingType == "rent" ? "Rent" : "Purchase"}
          </Link>
        )}
      </div>
    </div>
  );
}
