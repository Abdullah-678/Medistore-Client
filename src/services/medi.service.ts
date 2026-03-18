import { env } from "@/env";



const API_URL=env.API_URL;

interface GetMedicinesParams{
  search?:string
}
interface ServiceOptions{
  cache?:RequestCache
  revalidate?:number
}

export const MediServices={
  getMedicines:async function(params?:GetMedicinesParams,options?:ServiceOptions){
try{
  const url=new URL(`${API_URL}/medicines`)


if(params){
  Object.entries(params).forEach(([key,value])=>{
  if(value !== undefined && value !== null && value !==""){
    url.searchParams.append(key,value)
  }
  })
}

const config:RequestInit={};
if(options?.cache){
  config.cache=options.cache
}

if(options?.revalidate){
  config.next={revalidate:options.revalidate}
}

  // console.log(url.toString())
const res=await fetch(url.toString(),config)
const data=await res.json();
return {data:data,error:null}

}
catch(err){
  return {data:null,error:{message:"Something went wrong"}}
}
  },
  getMedicineByid:async function(id:string){
   try{
     const res=await fetch(`${API_URL}/medicines/${id}`)
    const data=await res.json();
    return{data:data,error:null}
   }

      catch(err){
  return {data:null,error:{message:"Something went wrong"}}
}
  }


}