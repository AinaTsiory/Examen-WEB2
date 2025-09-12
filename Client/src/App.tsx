import { Routes, Route } from "react-router-dom";
import Home from "./pages/authentification/Homes";
import Login from "./pages/authentification/Login";
import Signup from "./pages/authentification/Signup";
import Profile from "./pages/authentification/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./app.css";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
