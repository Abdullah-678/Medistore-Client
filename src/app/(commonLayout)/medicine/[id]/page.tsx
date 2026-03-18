import { MediServices } from "@/services/medi.service";
import { Medicine } from "@/types";

export async function generateStaticParams() {
  const data=await MediServices.getMedicines();
  return data?.data?.map((medicine:Medicine)=>({
    id:medicine.id
  })).splice(0,3)
}

export default async function MedicineDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: medicine } = await MediServices.getMedicineByid(id);

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl w-full">

        {/* Title */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {medicine.medicine_name}
          </h1>

        
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600 mb-4">
          ৳ {medicine.price}
        </p>

        {/* Description */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Description</h2>
          <p className="text-gray-600 text-sm">
            {medicine.description}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Stock:</span>{" "}
            {medicine.stock}
          </p>

          <p>
            <span className="font-medium text-gray-800">Expiry:</span>{" "}
            {new Date(medicine.expiry_date).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 ">
        <div className="">
            <button
            disabled={medicine.stock === 0}
            className=" flex-1 py-3 px-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-300"
          >
            {medicine.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

        <div>
            <button className="flex-1 px-2 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-100 transition">
            Buy Now
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

