import { useEffect, useState } from "react";
import api from "../services/api";
import { ChatBubbleLeftRightIcon, MagnifyingGlassIcon, CheckCircleIcon} from '@heroicons/react/24/solid';

interface FollowUp {
    id: number;
    clientName: string;
    invoiceNumber: string;
    dueDate: string;
    amount: number;
    status: string;
    lastContact: string | null;
}

function FollowUps() {
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // We'll connect this to the backend after the UI is working.
        const fetchFollowUps = async () => {
            try {
                const response = await api.get<FollowUp[]>("/followups/today");

                setFollowUps(response.data);
            } catch (error) {
                console.error("Error fetching follow-ups:", error);
            }
        };

        fetchFollowUps();
    }, []);

    const filteredFollowUps = followUps.filter((followUp) =>
        followUp.clientName.toLowerCase().includes(search.toLowerCase())
    );

    const dueToday = followUps.filter(
        (followUp) => followUp.status === "Due Today"
    ).length;

    const overdue = followUps.filter(
        (followUp) => followUp.status === "Overdue"
    ).length;

    const contacted = followUps.filter(
        (followUp) => followUp.lastContact !== null
    ).length;


    return (
        <div className="p-6">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <ChatBubbleLeftRightIcon className="h-7 w-7 text-blue-500" />

                        <h1 className="text-2xl font-semibold text-slate-900">
                            Follow-Ups
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your client follow-ups and payment reminders.
                    </p>
                </div>

                {/* Search */}
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                        Due Today
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {dueToday}
                    </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                        Overdue
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {overdue}
                    </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                        Contacted
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {contacted}
                    </p>
                </div>
            </div>

            {/* Follow-Up Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">

                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="font-semibold text-slate-900">
                        Today's Follow-Ups
                    </h2>
                </div>

                <table className="w-full text-left">

                    <thead className="border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Invoice</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Contact</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 text-sm">

                        {filteredFollowUps.map((followUp) => (

                            <tr
                                key={followUp.id}
                                className="hover:bg-slate-50"
                            >

                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {followUp.clientName}
                                </td>

                                <td className="px-6 py-4 text-slate-600">
                                    {followUp.invoiceNumber}
                                </td>

                                <td className="px-6 py-4 text-slate-600">
                                    {new Date(
                                        followUp.dueDate
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 text-slate-600">
                                    ${followUp.amount.toLocaleString()}
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                            followUp.status === "Overdue"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {followUp.status}
                                    </span>

                                </td>

                                <td className="px-6 py-4 text-slate-600">
                                    {followUp.lastContact
                                        ? new Date(
                                              followUp.lastContact
                                          ).toLocaleDateString()
                                        : "Never"}
                                </td>

                                <td className="px-6 py-4">

                                    {followUp.lastContact ? (

                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
                                        >
                                            <CheckCircleIcon className="h-4 w-4" />
                                            Contacted
                                        </button>

                                    ) : (

                                        <button
                                            type="button"
                                            className="rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                                        >
                                            Send Reminder
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default FollowUps;