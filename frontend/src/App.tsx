import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import FollowUps from "./pages/FollowUps";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public route: renders the Login component */}
                <Route path="/login" element={<Login />} />
                {/* Public route: renders the Register component */}
                <Route path="/register" element={<Register />} />
            {/* Protected section of the application. The user must be authenticated 
            to access DashboardLayout and any of its child routes. */}
                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Dashboard page */}
                    <Route path="/dashboard" element={<Dashboard />} />
     
                    {/* Clients page */}
                    <Route path="/clients" element={<Clients />} />
                    {/* Followups page */}
                    <Route path="/follow-ups" element={<FollowUps />} />
                    {/* Invoices page */}
                    <Route path="/invoices" element={<Invoices />} />
                </Route>
                {/* If the user visits the root URL (/), redirect them to the Dashboard. */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

/*
function App() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        Tailwind is working!
      </h1>
    </div>
  );
}


export default App;
*/