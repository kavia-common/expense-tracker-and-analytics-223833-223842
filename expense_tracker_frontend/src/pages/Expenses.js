import React, { useEffect, useState } from "react";
import { fetchExpenses, addExpense, deleteExpense } from "../services/expensesService";
import { fetchCategories } from "../services/categoriesService";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseForm } from "../components/ExpenseForm";

// PUBLIC_INTERFACE
export function ExpensesPage() {
  /** Primary page to view and add expenses. */
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchExpenses()]).then(([cats, exps]) => {
      setCategories(cats);
      setExpenses(exps);
    });
  }, []);

  const onAdd = async (payload) => {
    setBusy(true);
    try {
      const created = await addExpense(payload);
      setExpenses((prev) => [created, ...prev]);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    const confirm = window.confirm("Delete this expense?");
    if (!confirm) return;
    setBusy(true);
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid" style={{ gap: 20 }}>
      <h2>Expenses</h2>
      <ExpenseForm categories={categories} onSubmit={onAdd} />
      <ExpenseList items={expenses} onDelete={onDelete} />
      {busy && <div className="card">Working...</div>}
    </div>
  );
}
