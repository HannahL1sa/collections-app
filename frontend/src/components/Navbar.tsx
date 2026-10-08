import { useAuth } from "../context/AuthContext";
import { BellAlertIcon } from '@heroicons/react/24/solid';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Logo */}
                {/*<div className="px-3 py-4 mb-4">*/}
                <div className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                    <h1 className="text-xl font-bold text-gray-900">
                        Collections App
                    </h1>
                </div>
                {/* Mobile menu button */}
                <button
                    type="button"
                    className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 sm:hidden"
                >
                    <span className="text-xl">☰</span>
                </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">

                {/* Notification */}
                <button
                    type="button"
                    className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
                    <BellAlertIcon className="size-6 text-blue-500" />    
                </button>

                {/* User */}
                <div className="flex items-center gap-3">

                    {/* User avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                        {user?.firstName?.charAt(0).toUpperCase()}
                    </div>

                    {/* User information */}
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium text-gray-900">
                            {user?.firstName}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.role}
                        </p>
                    </div>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={logout}
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;

