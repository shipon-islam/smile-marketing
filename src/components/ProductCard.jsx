import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div key={product.id} className="p-3 border border-gray-200 rounded-md">
      <img
        className="w-[180px] h-[140px] mx-auto"
        src={product.image}
        alt={product.name || "product-image"}
      />
      <div className="text-sm space-y-1">
        <h5>${product.price}</h5>
        <h4 className="font-medium">{product.name}</h4>
        <p>Stock Available: {product.stock}</p>
        <p>{product.location}</p>
        <Link
          to="/client-request-form"
          className="bg-deepBlue w-full text-gray-300 py-1.5 rounded-md mt-4 cursor-pointer block text-center"
        >
          {product.sellingType == "rent" ? "Rent" : "Purchase"}
        </Link>
      </div>
    </div>
  );
}
