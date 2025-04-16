import { useEffect, useState } from "react";
import axios from "axios";
import {  getListDevicesNow, modelDevices, PaiementCyber } from "../services/devices.service";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
const api = "http://localhost:3001/devices";

const Dashboard = () => {

  const [devices, setDevices] = useState<modelDevices[]>([]);
  const [connectedCount, setConnectedCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCyber = true;
  const [isHours,setIsHours]=useState<boolean>(false);
  const [dataCyb, setDataCyb] = useState({ prix: 1000, duree: 0, par: 15, id: 0, numero: 0 });
  const [TabHours,setTabHours]=useState<boolean>(false);
const [searchDevices,setSearchDevices]=useState<string>('');
  const showInputDuree = (idD: number, duree: number) => {
    setDataCyb({ ...dataCyb, id: idD, duree: duree || 0 });
    setIsModalOpen(true);
  };

  const payement = async () => {
    if(isHours){
      dataCyb.duree=dataCyb.duree*60;
    }
    const pay = await PaiementCyber(dataCyb.prix, dataCyb.par, dataCyb.duree, dataCyb.id, dataCyb.numero);
    console.log(pay);
    fetchDevices();
    setIsModalOpen(false);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setDataCyb({ ...dataCyb, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDevices();
  
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get<modelDevices[]>(api);
      setDevices(response.data);
      setConnectedCount(response.data.filter((d) => d.statut === "connecter").length);
      setBlockedCount(response.data.filter((d) => d.statut === "bloquer").length);
      console.log(response.data)
    } catch (error) {
      console.error("Erreur lors du chargement des appareils", error);
    }
  };

  const handleBlock = async (id: string) => {
    await axios.get(`${api}/block/${id}`);
    setDevices((await getListDevicesNow()).data);
  };

  const handleUnblock = async (id: string) => {
    await axios.get(`${api}/deblock/${id}`);
    setDevices((await getListDevicesNow()).data);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Gestion des Connexions Wi-Fi</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center mb-6">
        <div className="p-4 bg-white text-green-600 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{connectedCount}</p>
          <p>Connectés</p>
        </div>
        <div className="p-4 bg-white text-red-600 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{blockedCount}</p>
          <p>Bloqués</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <input type="text" name="" id="" value={searchDevices} placeholder="recherche par mac..." className="border border-white" onChange={(e)=>setSearchDevices(e.target.value)}/>
        <table className="w-full table-auto border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border">Adresse IP</th>
              <th className="p-3 border">Adresse MAC</th>
              <th className="p-3 border">État</th>
              {isCyber && (
                <>
                  <th className="p-3 border">Prix</th>
                  <th className="p-3 border">Durée
                   en heure <input type="radio" name="" id="" readOnly checked={TabHours} onClick={()=>TabHours?(setTabHours(false)
                  
                  ):setTabHours(true)}/>
                  </th>
                  <th className="p-3 border">Numéro</th>
                </>
              )}
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.filter(s=>s.mac?.toUpperCase().includes(searchDevices.toUpperCase())).map((device) => (
              <tr key={device.id} className="text-center border">
                <td className="p-3 border">{device.ip}</td>
                <td className="p-3 border">{device.mac || "N/A"}</td>
                <td className={`p-3 border ${device.statut === "connecter" ? "text-green-500" : "text-red-500"}`}>{device.statut}</td>
                {isCyber && (
                  <>
                    <td className="p-3 border">{device.price}</td>
                    <td className="p-3 border">{TabHours?device.hours/60+"h":device.hours+"min"}</td>
                    <td className="p-3 border">{device.numero}</td>
                  </>
                )}
                <td className="p-3 border">
                 
                  {device.statut === "connecter" ? (
                    <button onClick={() => device.mac?handleBlock(device.mac):handleBlock(device.ip)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded">Bloquer</button>
                  ) : (
                    <button onClick={() => device.mac?handleUnblock(device.mac):handleUnblock(device.ip)} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded">Débloquer</button>
                  )
                }
                  {isCyber && (
                    <button onClick={() => showInputDuree(device.id, device.hours)} className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Gérer</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={isModalOpen}  onClick={() => setIsModalOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Gestion du Temps</DialogTitle>
      <DialogContent dividers>
        <FormControlLabel
          control={
            <Checkbox
              checked={isHours}
              onChange={() => setIsHours(!isHours)}
              name="isHours"
            />
          }
          label="Heure"
        />

        <Typography variant="subtitle1" gutterBottom>
          {isHours ? "Entrer la durée en heure" : "Entrer la durée en minute"}
        </Typography>
        <TextField
          type="number"
          name="duree"
          value={dataCyb.duree}
          onChange={handleChange}
          fullWidth
          placeholder={isHours ? "Durée en heure" : "Durée en minute"}
          margin="normal"
        />

        <Typography variant="subtitle1" gutterBottom>
          Entrer le numéro de l'appareil
        </Typography>
        <TextField
          type="number"
          name="numero"
          value={dataCyb.numero}
          onChange={handleChange}
          fullWidth
          placeholder="Numéro de l'appareil"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={payement} variant="contained" color="primary">
          Enregistrer
        </Button>
        <Button onClick={() => setIsModalOpen(false)} variant="outlined" color="secondary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
      
    </div>
  );
};

export default Dashboard;
