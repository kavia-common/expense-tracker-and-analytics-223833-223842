import { apiRequest } from "./apiClient";

// PUBLIC_INTERFACE
export async function fetchCategories() {
  /** Retrieve available categories. */
  return apiRequest("/api/categories");
}
