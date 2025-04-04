import { useEffect, useState } from "react";
import axios from "axios";
import {  getListDevicesNow, modelDevices, PaiementCyber } from "../services/devices.service";
import { Dialog, DialogTitle, DialogContent, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import io from "socket.io-client";
const api = "http://localhost:3001/devices";

const Dashboard = () => {
  const [notifications, setNotifications] = useState<string[]>([]); 
  const [devices, setDevices] = useState<modelDevices[]>([]);
  const [connectedCount, setConnectedCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCyber = true;
  const [dataCyb, setDataCyb] = useState({ prix: 1000, duree: 0, par: 15, id: 0, numero: 0 });

  // const socket = io("http://localhost:3000");

  //notifications
  useEffect(() => {
    // Écouter les notifications en temps réel
    // socket.on("notification", (device: any) => {
    //   triggerNotification(device);
    //   triggerSound();
    //   triggerVibration();
    //   setNotifications((prevNotifications) => [
    //     ...prevNotifications,
    //     `Le temps est écoulé pour l'appareil ${device.ip}`,
    //   ]);
    // });

    // return () => {
    //   socket.off("notification"); // Nettoyer l'écouteur quand le composant est démonté
    // };
  }, []);

  // const triggerNotification = (device: any) => {
  //   if (Notification.permission === "granted") {
  //     new Notification(`Le temps est écoulé pour l'appareil ${device.ip}`, {
  //       body: `Adresse MAC: ${device.mac || "N/A"} - Numéro: ${device.numero}`,
  //       icon: "https://www.example.com/icon.png",
  //     });
  //   }
  // };

  // const triggerSound = () => {
  //   const audio = new Audio("https://www.example.com/alert-sound.mp3");
  //   audio.play();
  // };

  // const triggerVibration = () => {
  //   if ("vibrate" in navigator) {
  //     navigator.vibrate([500]); // Vibration de 500ms
  //   }
  // };

  // const checkTime = () => {
  //   devices.forEach((device) => {
  //     if (device.statut === "connecter" && device.hours > 0) {
  //       const remainingTime = device.hours - 1; // Exemple de calcul de temps restant
  //       if (remainingTime <= 0) {
  //         // Si le temps est écoulé, informer le serveur pour notifier tous les clients
  //         socket.emit("device-time-up", device); // Envoie l'événement au serveur
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
    
  //   const timer = setInterval(checkTime, 1000); // Vérifier toutes les secondes
  //   return () => clearInterval(timer); // Nettoyer l'intervalle lors du démontage du composant
  // }, [devices]);

  //notifications

  const showInputDuree = (idD: number, duree: number) => {
    setDataCyb({ ...dataCyb, id: idD, duree: duree || 0 });
    setIsModalOpen(true);
  };

  const payement = async () => {
    const pay = await PaiementCyber(dataCyb.prix, dataCyb.par, dataCyb.duree, dataCyb.id, dataCyb.numero);
    console.log(pay);
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
        <table className="w-full table-auto border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border">Adresse IP</th>
              <th className="p-3 border">Adresse MAC</th>
              <th className="p-3 border">État</th>
              {isCyber && (
                <>
                  <th className="p-3 border">Prix</th>
                  <th className="p-3 border">Durée</th>
                  <th className="p-3 border">Numéro</th>
                </>
              )}
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="text-center border">
                <td className="p-3 border">{device.ip}</td>
                <td className="p-3 border">{device.mac || "N/A"}</td>
                <td className={`p-3 border ${device.statut === "connecter" ? "text-green-500" : "text-red-500"}`}>{device.statut}</td>
                {isCyber && (
                  <>
                    <td className="p-3 border">{device.price}</td>
                    <td className="p-3 border">{device.hours}</td>
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

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogTitle>Gestion du Temps</DialogTitle>
        <DialogContent>
          <input type="number" value={dataCyb.duree} name="duree" placeholder="Entrer la durée en minute" className="w-full p-2 border rounded mt-2" onChange={handleChange} />
          <input type="number" value={dataCyb.numero} name="numero" placeholder="Entrer le numéro" className="w-full p-2 border rounded mt-2" onChange={handleChange} />
        </DialogContent>
        <DialogFooter>
          <Button onClick={payement}>Enregistrer</Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Annuler</Button>
        </DialogFooter>
      </Dialog>

      <div>
        <h2>Notifications  :</h2>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
