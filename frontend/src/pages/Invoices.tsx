import { useEffect, useState } from "react";
import api from "../services/api";
import { DocumentCurrencyDollarIcon, MagnifyingGlassIcon,} from "@heroicons/react/24/solid";

interface Invoice {
  id: number;
  invoiceNumber: string;
  engagementNumber: string;
  clientId: number;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: string;
}

function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
          api
              .get<Invoice[]>("/invoices")
              .then((response) => {
                  console.log("Invoices:", response.data);
                  setInvoices(response.data);
              })
              .catch((error) => {
                  console.error("Error fetching ivoices:", error);
              });
      }, []);

      // Filter invoices based on search
const filteredInvoices = invoices.filter((invoice) => {
    const searchTerm = search.toLowerCase();

    return (
        invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
        invoice.engagementNumber.toLowerCase().includes(searchTerm) ||
        invoice.clientId.toString().includes(searchTerm) ||
        invoice.invoiceDate.toLowerCase().includes(searchTerm) ||
        invoice.dueDate.toLowerCase().includes(searchTerm) ||
        invoice.amount.toString().includes(searchTerm) ||
        invoice.status.toLowerCase().includes(searchTerm)
    );
});
  
  return (
      <div className="p-6">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                      <div>
                          <div className="flex items-center gap-2">
                              <DocumentCurrencyDollarIcon className="h-7 w-7 text-blue-500" />
      
                              <h1 className="text-2xl font-semibold text-slate-900">
                                  Invoices
                              </h1>
                          </div>
      
                          <p className="mt-1 text-sm text-slate-500">
                              Keep track of all your assigned invoices.
                          </p>
                      </div>
      
                      {/* Search */}
                      <div className="relative">
                          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      
                          <input
                              type="text"
                              placeholder="Search invoices..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                      </div>
                  </div>

{/* Invoice Table */}
<div className="overflow-x-auto">
    <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
                <th scope="col" className="px-6 py-4">
                    Invoice Number
                </th>

                <th scope="col" className="px-6 py-4">
                    Engagement Number
                </th>

                <th scope="col" className="px-6 py-4">
                    Client ID
                </th>

                <th scope="col" className="px-6 py-4">
                    Invoice Date
                </th>

                <th scope="col" className="px-6 py-4">
                    Due Date
                </th>

                <th scope="col" className="px-6 py-4">
                    Amount
                </th>

                <th scope="col" className="px-6 py-4">
                    Status
                </th>
            </tr>
        </thead>

        <tbody>
            {filteredInvoices.map((invoice) => (
                <tr
                    key={invoice.id}
                    className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                        {invoice.invoiceNumber}
                    </td>

                    <td className="px-6 py-4">
                        {invoice.engagementNumber}
                    </td>

                    <td className="px-6 py-4">
                        {invoice.clientId}
                    </td>

                    <td className="px-6 py-4">
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                        ${invoice.amount.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                invoice.status === "Overdue"
                                    ? "bg-red-100 text-red-800"
                                    : invoice.status === "Outstanding"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                        >
                            {invoice.status}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
);
}

export default Invoices;