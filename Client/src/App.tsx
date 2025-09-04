import { useState } from "react";

export default function App() {
  const [apiMessage, setApiMessage] = useState("");
  const [dbTime, setDbTime] = useState("");

  const testAPI = async () => {
    try {
      // Test route /
      const res1 = await fetch("http://localhost:5000/");
      const data1 = await res1.text();
      setApiMessage(data1);

      // Test route /test-db
      const res2 = await fetch("http://localhost:5000/test-db");
      const data2 = await res2.json();
      setDbTime(data2.dbTime.now);
    } catch (err) {
      console.error(err);
      setApiMessage("Erreur API");
      setDbTime("Erreur DB");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold text-blue-500">Test API & DB</h1>
      
      <button
        onClick={testAPI}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Lancer Test
      </button>

      <div className="text-lg">
        <p><strong>Message API :</strong> {apiMessage}</p>
        <p><strong>Heure DB :</strong> {dbTime}</p>
      </div>
    </div>
  );
}
