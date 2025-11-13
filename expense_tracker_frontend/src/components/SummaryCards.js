import React from "react";

// PUBLIC_INTERFACE
export function SummaryCards({ expenses }) {
  /** Simple totals: count and sum. */
  const total = expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0);
  return (
    <div className="grid cols-2">
      <div className="card">
        <div className="space-between">
          <span>Total Expenses</span>
          <span style={{ color: "var(--secondary)", fontWeight: 700 }}>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="card">
        <div className="space-between">
          <span>Items</span>
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>{expenses.length}</span>
        </div>
      </div>
    </div>
  );
}
