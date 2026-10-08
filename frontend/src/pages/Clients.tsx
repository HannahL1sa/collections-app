import { useEffect, useState } from "react";
import api from "../services/api";
import { UserGroupIcon, MagnifyingGlassIcon,} from "@heroicons/react/24/solid";

interface Client {
    id: number;
    name: string;
    email: string;
    customerSegment: string;
    collectorId?: number;
}

function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api
            .get<Client[]>("/clients")
            .then((response) => {
                console.log("Clients:", response.data);
                setClients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    // Filter clients based on search
    const filteredClients = clients.filter((client) => {
        const searchTerm = search.toLowerCase();

        return (
            client.name.toLowerCase().includes(searchTerm) ||
            client.email.toLowerCase().includes(searchTerm) ||
            client.customerSegment.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-7 w-7 text-blue-500" />

                        <h1 className="text-2xl font-semibold text-slate-900">
                            Clients
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        View and manage all your clients.
                    </p>
                </div>

                {/* Search */}
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Client Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="font-semibold text-slate-900">
                        Your Client List
                    </h2>
                </div>

                <table className="w-full text-left">
                    <thead className="border-b border-slate-200 bg-slate-50 text-sm uppercase font-semibold text-slate-700">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Segment</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 text-sm">
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <tr
                                    key={client.id}
                                    className="hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {client.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {client.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                client.customerSegment.startsWith(
                                                    "A"
                                                )
                                                    ? "bg-red-100 text-red-700"
                                                    : client.customerSegment.startsWith(
                                                          "B"
                                                      )
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {client.customerSegment}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-8 text-center text-slate-500"
                                >
                                    No clients found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Clients;


