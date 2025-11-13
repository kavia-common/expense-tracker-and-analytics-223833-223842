import React from "react";

// PUBLIC_INTERFACE
export function ExpenseList({ items, onDelete }) {
  /** Renders a table-style list of expenses. */
  return (
    <div className="card">
      <div className="space-between" style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>Recent Expenses</h3>
        <span style={{ color: "var(--muted)" }}>{items.length} items</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Amount</th>
              <th style={th}>Date</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td style={td}>{e.title}</td>
                <td style={td}>{e.category}</td>
                <td style={td}>${Number(e.amount).toFixed(2)}</td>
                <td style={td}>{new Date(e.date).toLocaleString()}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  <button className="btn-danger" onClick={() => onDelete(e.id)} aria-label={`Delete ${e.title}`}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td style={{ ...td, padding: 20 }} colSpan={5}>
                  No expenses yet. Add one using the form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", borderBottom: "1px solid var(--border)", padding: "8px" };
const td = { borderBottom: "1px solid var(--border)", padding: "10px 8px" };
