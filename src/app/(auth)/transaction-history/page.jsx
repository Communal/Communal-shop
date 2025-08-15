"use client";
import { useState, useEffect } from "react";
import { Select } from "@/components/Select";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.status) params.append("status", filters.status);
    if (filters.description) params.append("description", filters.description);

    fetch(`/api/transaction-history?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 bg-white p-3 shadow-sm z-10">
        <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
        
        {/* Filters - Full width with better spacing */}
        <div className="mt-3 space-y-2">
          <Select
            label="Type"
            options={[
              { value: "", label: "All Types" },
              { value: "CREDIT", label: "Credit" },
              { value: "DEBIT", label: "Debit" },
            ]}
            value={filters.type}
            onChange={(val) => setFilters((f) => ({ ...f, type: val }))}
            fullWidth
          />
          <Select
            label="Status"
            options={[
              { value: "", label: "All Statuses" },
              { value: "SUCCESS", label: "Success" },
              { value: "FAILED", label: "Failed" },
            ]}
            value={filters.status}
            onChange={(val) => setFilters((f) => ({ ...f, status: val }))}
            fullWidth
          />
          <Select
            label="Description"
            options={[
              { value: "", label: "All Descriptions" },
              { value: "Wallet in", label: "Wallet In" },
              { value: "Withdrawal", label: "Withdrawal" },
            ]}
            value={filters.description}
            className="w-full"
            onChange={(val) => setFilters((f) => ({ ...f, description: val }))}
            fullWidth
          />
        </div>
      </div>

      {/* Transactions Table - Full width scrollable */}
      <div className="p-3">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 py-4 text-center text-sm text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${tx.amount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {tx.type}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}