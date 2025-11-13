//
// Simple in-memory mock API for local development.
//
const inMemory = {
  categories: [
    { id: "food", name: "Food" },
    { id: "transport", name: "Transport" },
    { id: "utilities", name: "Utilities" },
    { id: "entertainment", name: "Entertainment" },
    { id: "other", name: "Other" },
  ],
  expenses: [
    { id: "e1", title: "Groceries", amount: 54.2, category: "food", date: new Date().toISOString() },
    { id: "e2", title: "Bus pass", amount: 25.0, category: "transport", date: new Date().toISOString() },
  ],
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export const mockApi = {
  async listExpenses() {
    await delay();
    // Return newest first
    return inMemory.expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  async createExpense(payload) {
    await delay();
    const exp = {
      id: uid(),
      title: String(payload.title || "Untitled"),
      amount: Number(payload.amount || 0),
      category: payload.category || "other",
      date: payload.date || new Date().toISOString(),
    };
    inMemory.expenses.push(exp);
    return exp;
  },
  async deleteExpense(id) {
    await delay();
    const idx = inMemory.expenses.findIndex((e) => e.id === id);
    if (idx >= 0) {
      const removed = inMemory.expenses.splice(idx, 1)[0];
      return removed;
    }
    throw new Error("Not found");
  },
  async listCategories() {
    await delay();
    return inMemory.categories;
  },
};

function delay(ms = 150) {
  return new Promise((res) => setTimeout(res, ms));
}
