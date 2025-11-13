import { apiRequest } from "./apiClient";

// PUBLIC_INTERFACE
export async function fetchExpenses() {
  /** Retrieve list of expenses as an array. */
  return apiRequest("/api/expenses");
}

// PUBLIC_INTERFACE
export async function addExpense(expense) {
  /** Create a new expense. */
  return apiRequest("/api/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
}

// PUBLIC_INTERFACE
export async function deleteExpense(id) {
  /** Delete an expense by id. */
  return apiRequest(`/api/expenses/${id}`, { method: "DELETE" });
}
