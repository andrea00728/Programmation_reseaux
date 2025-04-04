import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const Dashboard = () => {
  const [devices, setDevices] = useState<any[]>([]); // Remplace par le bon type
  const [notifications, setNotifications] = useState<string[]>([]); // Pour stocker les notifications en temps réel

  const socket = io("http://localhost:3000");  // Connexion au serveur Socket.IO

  useEffect(() => {
    // Écouter les notifications en temps réel
    socket.on("notification", (device: any) => {
      triggerNotification(device);
      triggerSound();
      triggerVibration();
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `Le temps est écoulé pour l'appareil ${device.ip}`,
      ]);
    });

    return () => {
      socket.off("notification"); // Nettoyer l'écouteur quand le composant est démonté
    };
  }, []);

  const triggerNotification = (device: any) => {
    if (Notification.permission === "granted") {
      new Notification(`Le temps est écoulé pour l'appareil ${device.ip}`, {
        body: `Adresse MAC: ${device.mac || "N/A"} - Numéro: ${device.numero}`,
        icon: "https://www.example.com/icon.png",
      });
    }
  };

  const triggerSound = () => {
    const audio = new Audio("https://www.example.com/alert-sound.mp3");
    audio.play();
  };

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([500]); // Vibration de 500ms
    }
  };

  const checkTime = () => {
    devices.forEach((device) => {
      if (device.statut === "connecter" && device.hours > 0) {
        const remainingTime = device.hours - 1; // Exemple de calcul de temps restant
        if (remainingTime <= 0) {
          // Si le temps est écoulé, informer le serveur pour notifier tous les clients
          socket.emit("device-time-up", device); // Envoie l'événement au serveur
        }
      }
    });
  };

  useEffect(() => {
    fetchDevices();
    const timer = setInterval(checkTime, 1000); // Vérifier toutes les secondes
    return () => clearInterval(timer); // Nettoyer l'intervalle lors du démontage du composant
  }, [devices]);

  const fetchDevices = async () => {
    try {
      // Charge les appareils
      const response = await axios.get("/api/devices");
      setDevices(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des appareils", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold">Gestion des Connexions Wi-Fi</h1>

      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border">Adresse IP</th>
              <th className="p-3 border">Adresse MAC</th>
              <th className="p-3 border">État</th>
              <th className="p-3 border">Durée</th>
              <th className="p-3 border">Numéro</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="text-center border">
                <td className="p-3 border">{device.ip}</td>
                <td className="p-3 border">{device.mac || "N/A"}</td>
                <td className={`p-3 border ${device.statut === "connecter" ? "text-green-500" : "text-red-500"}`}>
                  {device.statut}
                </td>
                <td className="p-3 border">{device.hours}</td>
                <td className="p-3 border">{device.numero}</td>
                <td className="p-3 border">
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded">Bloquer</button>
                  <button className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Gérer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Notifications en Temps Réel :</h2>
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
