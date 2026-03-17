import MedicineCard from "@/components/modules/homepage/medicineCard";
import { MediServices } from "@/services/medi.service";
import { Medicine } from "@/types";

export const dynamic="force-dynamic";

export default async function MedicinePage() {
const data= await MediServices.getMedicines();

  return (
 <div className="flex justify-center px-6">
  <div className="flex flex-wrap justify-between w-[1200px] gap-6">
    {data?.data.map((medicine: Medicine) => (
      <div key={medicine.id} className="w-[270px]">
        <MedicineCard medicine={medicine} />
      </div>
    ))}
  </div>
</div>
  );
}
