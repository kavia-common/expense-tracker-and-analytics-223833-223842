//
// API Client with mock fallback when backend is unreachable and not in production.
//
import { getEnv, isMockApiEnabled } from "../config/env";
import { mockApi } from "./mock/mockApi";

const env = getEnv();

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /**
   * Perform a fetch to the backend with graceful fallback to mock API.
   * - If backend URL is not configured or fetch fails and mock is enabled, use mock.
   * - Never use mock in production (guarded by isMockApiEnabled()).
   */
  const urlBase = env.apiBase?.replace(/\/+$/, "") || "";
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${urlBase}${fullPath}`;

  const shouldUseMock = isMockApiEnabled() || !urlBase;

  if (!urlBase || shouldUseMock) {
    // Try real backend first if configured; otherwise directly mock
    if (urlBase) {
      try {
        const res = await fetch(url, {
          ...options,
          headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      } catch (_err) {
        // fallthrough to mock
      }
    }
    return mockRouter(fullPath, options);
  }

  const res = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
  });
  if (!res.ok) {
    // In non-prod and with mock enabled, fallback
    if (isMockApiEnabled()) {
      return mockRouter(fullPath, options);
    }
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

function mockRouter(path, options) {
  // very small router
  const method = (options.method || "GET").toUpperCase();
  if (path === "/healthz") return Promise.resolve({ status: "ok" });

  // expenses
  if (path === "/api/expenses" && method === "GET") return mockApi.listExpenses();
  if (path === "/api/expenses" && method === "POST")
    return mockApi.createExpense(JSON.parse(options.body || "{}"));
  if (path.startsWith("/api/expenses/") && method === "DELETE") {
    const id = path.split("/").pop();
    return mockApi.deleteExpense(id);
  }

  // categories
  if (path === "/api/categories" && method === "GET") return mockApi.listCategories();

  return Promise.reject(new Error(`Mock route not found: ${method} ${path}`));
}
