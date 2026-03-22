import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { userService } from "@/services/user.service";
import { getSession } from "better-auth/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


const API_URL=env.API_URL
  const { data } = await userService.getSession();
export default  function CreateMedicineForm() {
  const createMedicine=async(formdata:FormData)=>{
    "use server";
  
    const medicine_name=formdata.get("medicine_name") as string;
    const price=Number(formdata.get("price")) ;
    const stock=Number(formdata.get("stock") );
    const category_id=formdata.get("category_id") as string;
    const expiry_date=new Date(formdata.get("expiry_date") as string);
    const description=formdata.get("description") as string;
    const seller_id=data.user.id as string
    
  const medicineData={
    medicine_name,
    price,
    stock,
    category_id,
    expiry_date,
    description,
    seller_id
  
  }

  // console.log(medicineData)
  const cookieStore=await cookies();

  const res=await fetch(`${API_URL}/medicines/createmedicine`,{
    method:"POST",
   
      headers:{
        "Content-Type":"application/json",
        Cookie:cookieStore.toString()
      },
      body:JSON.stringify(medicineData)
    
  })





  }
  return (

  <Card className="max-w-8 mx-auto shadow-lg rounded-md">
  <CardHeader>
    <CardTitle className="text-2xl">Create Medicine</CardTitle>
    <CardDescription>
      Add a new medicine to your inventory
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form id="medicine-form" action={createMedicine} className="space-y-4">

      {/* Medicine Name */}
      <FieldGroup>
        <Field>
          <FieldLabel>Medicine Name</FieldLabel>
          <Input type="text" name="medicine_name" placeholder="Paracetamol 500mg" required />
        </Field>
      </FieldGroup>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Price (৳)</FieldLabel>
          <Input type="number" name="price" placeholder="100" required />
        </Field>

        <Field>
          <FieldLabel>Stock</FieldLabel>
          <Input type="number" name="stock" placeholder="50" required />
        </Field>
      </div>

      {/* Category */}
      <Field>
        <FieldLabel>Category ID</FieldLabel>
        <Input type="text" name="category_id" placeholder="Enter category id" required />
      </Field>

      {/* Expiry Date */}
      <Field>
        <FieldLabel>Expiry Date</FieldLabel>
        <Input type="date" name="expiry_date" required />
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel>Description</FieldLabel>
        <textarea
          name="description"
          rows={4}
          placeholder="Write medicine details..."
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </Field>

    </form>
  </CardContent>

  <CardFooter>
    <Button
      form="medicine-form"
      type="submit"
      className="w-full py-2 text-base font-medium"
    >
      Create Medicine
    </Button>
  </CardFooter>
</Card>

  );
}
