import { Medicine } from "@/types";
import Link from "next/link";

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">

      {/* Top Section */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
          {medicine.medicine_name}
        </h2>

        {/* Stock Badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            medicine.stock > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {medicine.stock > 0 ? "In Stock" : "Out"}
        </span>
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-blue-600 mb-2">
        ৳ {medicine.price}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
        {medicine.description}
      </p>

      {/* Expiry */}
      <p className="text-xs text-gray-400 mb-4">
        Exp: {new Date(medicine.expiry_date).toLocaleDateString()}
      </p>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col gap-2">

        {/* Stock Info */}
        <p className="text-xs text-gray-500">
          {medicine.stock > 0
            ? `${medicine.stock} items available`
            : "Currently unavailable"}
        </p>

        {/* Buttons Row */}
        <div className="flex gap-2">

          {/* Add to Cart */}
          <button
            disabled={medicine.stock === 0}
            className="flex-1 py-2 px-1 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {medicine.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Read More */}
          <Link
            href={`/medicine/${medicine.id}`}
            className="flex-1 text-center py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
           Read <br /> More
          </Link>

        </div>

      </div>
    </div>
  );
}