import { env } from "@/env";


const API_URL=env.API_URL;

export const MediServices={
  getMedicines:async function(){
try{
const res=await fetch(`${API_URL}/medicines`,
  {next:{revalidate:10}}
)
const data=await res.json();
return {data:data,error:null}

}
catch(err){
  return {data:null,error:{message:"Something went wrong"}}
}
  }
}