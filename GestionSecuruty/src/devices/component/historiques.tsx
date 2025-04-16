import { useEffect, useState } from "react";
import { deletDevices, getAllDevicesHistory, modelDevices } from "../services/devices.service";
import DeleteIcon from '@mui/icons-material/Delete'; // Import de l'icône poubelle

export default function Historique() {
  const [dataHistorique, setDataHistorique] = useState<modelDevices[]>([]);
 const [searchHIstorique,setSearchHistorique]=useState<string>('');
  const listHistorique = async () => {
    try {
      const response = await getAllDevicesHistory();
      setDataHistorique(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique :", error);
    }
  };


  useEffect(() => {
    listHistorique();
    
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">📜 Historique des appareils</h1>
      <input type="text" placeholder="recherche par mac..." className="border border-white" value={searchHIstorique} onChange={(e)=>setSearchHistorique(e.target.value)}/>
      <div className="space-y-4">
        {(dataHistorique.filter(s=>s.mac?.toUpperCase().includes(searchHIstorique.toUpperCase()))).map((item) => (
          <div key={item.id} className="p-4 bg-gray-800 rounded-lg shadow flex justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">💻 {item.ip}</h5>
              <h5 className="text-gray-400">🔗 {item.mac || "N/A"}</h5>
              <h5 className="text-gray-500">📅 {item.dateDevices ? item.dateDevices.toString(): "Date inconnue"}</h5>
            </div>
            <button className="p-2 bg-red-600 hover:bg-red-800 rounded-full text-white"
            onClick={()=>{deletDevices(item.id);
              listHistorique();
            }}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
