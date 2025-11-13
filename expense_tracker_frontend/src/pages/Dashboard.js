import React, { useEffect, useState } from "react";
import { fetchExpenses } from "../services/expensesService";
import { SummaryCards } from "../components/SummaryCards";

// PUBLIC_INTERFACE
export function DashboardPage() {
  /** Dashboard shows summary of expenses. */
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses().then((data) => setExpenses(data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? <div className="card">Loading...</div> : <SummaryCards expenses={expenses} />}
    </div>
  );
}
