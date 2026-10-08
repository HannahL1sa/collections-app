import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
    return (
        <>
        {/* Navbar remains visible on every protected page */}
        <Navbar />

        {/* Sidebar remains visible on every protected page */} 
        <Sidebar />

        {/* The content of the current route is rendered here. */}
        <main className="sm:ml-64">
            <Outlet />
        </main>
        </>
    );
}

export default DashboardLayout;