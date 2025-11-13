import React, { useEffect, useMemo, useState } from "react";
import { fetchExpenses } from "../services/expensesService";

// PUBLIC_INTERFACE
export function AnalyticsPage() {
  /** Displays simple analytics grouped by category. */
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  const byCategory = useMemo(() => {
    const map = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  return (
    <div className="grid" style={{ gap: 20 }}>
      <h2>Analytics</h2>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Spending by Category</h3>
        {byCategory.length === 0 ? (
          <div>No data yet.</div>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {byCategory.map(([cat, sum]) => (
              <li key={cat} style={{ marginBottom: 6 }}>
                <strong>{cat}</strong>: ${sum.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
