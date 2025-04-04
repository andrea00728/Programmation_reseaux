import { useEffect, useState } from "react"
import { deletDevices, listDevices, modelDevices } from "../services/devices.service";

export default function Home(){
const [devices,setDevices]=useState<modelDevices[]>([]);
const listData=async()=>{
   const data=(await listDevices()).data;
   if(data.length!=0){
    setDevices(data);
   }
}
const deleteDevices=async(id:number)=>{
 deletDevices(id)
 .then(response=>{
    console.log(response.data.succee);
    
 })
 .catch(error=>console.error(error));
}
useEffect(()=>{
    listData();
})
return(
    <>
    <h1>Hey</h1>
    </>
)
}