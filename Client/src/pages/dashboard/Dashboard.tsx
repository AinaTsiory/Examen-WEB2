import Sidebar from "../../components/Sidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenus: 400, depenses: 200 },
  { name: "Feb", revenus: 300, depenses: 250 },
  { name: "Mar", revenus: 500, depenses: 300 },
  { name: "Apr", revenus: 200, depenses: 150 },
];

export default function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto ml-[16.6%]"> 
        <div>
          <h2 className="text-2xl font-bold mb-4">Graphique des revenus</h2>
          <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenus" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Graphique des dépenses</h2>
          <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="depenses" stroke="#F43F5E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
