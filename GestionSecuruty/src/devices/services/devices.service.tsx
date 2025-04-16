import axios from "axios";

const api="http://localhost:3000/devices";
export interface modelDevices{
    id:number,
    ip:string,
    mac:string|null,
    hours:number;
    price:string;
    numero:number;
    dateDevices:Date|string;
    statut:string;
}

export const listDevices=async()=>{
const list=await axios.get<modelDevices[]>(api);
return list;
}
export const blockDevices=async(id:string)=>{
    const list=await axios.get<{succee:string}>(`${api}/block/${id}`);
    return list;
}
export const deblockDevices=async(id:string)=>{
    const list=await axios.get<{succee:string}>(`${api}/deblock/${id}`);
    return list;
}
export const deletDevices=async(id:number)=>{
    const list=await axios.delete<{succee:string}>(`${api}/delete/${id}`);
    return list;
}
export const PaiementCyber=async(prix:number,par:number,duree:number,id:number,numero:number)=>{
   const total=prix*duree/par;
   await axios.put(`${api}/paiementCyber/${id}`,{prix:total,duree,numero});
   return total;
}
export const getDevicesBlockHistory=async()=>{
   const list=await axios.get<modelDevices[]>(`${api}/hitoryBlock`);
   return list;
}
export const getAllDevicesHistory=async()=>{
    const list=await axios.get<modelDevices[]>(`${api}/history`);
    return list;
}
export const getListDevicesNow=async()=>{
    const list=await axios.get<modelDevices[]>(`${api}/allDevices`);
    return list;
}