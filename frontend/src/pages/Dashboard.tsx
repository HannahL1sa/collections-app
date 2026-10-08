import { useAuth } from "../context/AuthContext";
import wave from "../assets/waving-hand.png";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Client {
    id: number;
    name: string;
    email: string;
    segment: string;
    collectorId?: number;
}

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

function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
    useEffect(() => {
        api
            .get<Client[]>("/clients")
            .then((response) => {
                setClients(response.data);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
    useEffect(() => {
      api
          .get<Invoice[]>("/invoices")
          .then((response) => {
              console.log("Invoices:", response.data);
              setInvoices(response.data);
          })
          .catch((error) => {
              console.error("Error fetching invoices:", error);
          });
  }, []);

  // Total amount still owed
  const totalAmountDue = invoices
    .filter(
        (invoice) =>
            invoice.status === "Outstanding" ||
            invoice.status === "Overdue"
    )
    .reduce((total, invoice) => total + invoice.amount, 0);

  // Number of outstanding invoices
  const outstandingInvoices = invoices.filter(
      (invoice) => invoice.status === "Outstanding"
  ).length;

  // Number of overdue invoices
  const overdueInvoices = invoices.filter(
      (invoice) => invoice.status === "Overdue"
  ).length;

  const { user } = useAuth();
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    }

    if (hour < 18) {
        return "Good afternoon";
    }

    return "Good evening";
};

  return (
        <main className="p-4 sm:p-6">
          {/* Page Header */}
          <div className="mb-6">
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
                  {getGreeting()}, {user?.firstName}

                  <img
                      src={wave}
                      alt=""
                      className="h-12 w-12"
                  />
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                  Here’s what’s happening with your collections today.
              </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Total Clients */}
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">
                  Total Clients Assigned
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                    {clients.length}
                </p>
              </div>

              {/* Total Amount Due */}
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">
                  Total Amount Due
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  ${totalAmountDue.toLocaleString()}
                </p>
              </div>

              {/* Outstanding Invoices */}
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="text-sm text-gray-500">
                    Outstanding Invoices
                </p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                    {outstandingInvoices}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Not yet past due
                </p>
          </div>

          {/* Overdue Invoices */}
          <div className="rounded-lg border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">
                  Overdue Invoices
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {overdueInvoices}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                  Past their due date
              </p>
          </div>
        </div>
      </main>
  );
}

export default Dashboard;

