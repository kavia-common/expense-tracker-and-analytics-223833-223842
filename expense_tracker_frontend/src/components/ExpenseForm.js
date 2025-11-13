import React, { useState } from "react";

// PUBLIC_INTERFACE
export function ExpenseForm({ categories, onSubmit }) {
  /** Add expense form. */
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "other");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!title || !amount || Number.isNaN(amt)) return;
    onSubmit({ title, amount: amt, category, date: new Date().toISOString() });
    setTitle("");
    setAmount("");
    setCategory(categories[0]?.id || "other");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Add Expense</h3>
      <div className="row" style={{ marginBottom: 10 }}>
        <div style={{ flex: 2 }}>
          <label className="label" htmlFor="title">Title</label>
          <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Coffee" />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label" htmlFor="amount">Amount</label>
          <input id="amount" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 3.50" />
        </div>
        <div style={{ flex: 1 }}>
          <label className="label" htmlFor="category">Category</label>
          <select id="category" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-between">
        <div />
        <button className="btn" type="submit">Add</button>
      </div>
    </form>
  );
}
