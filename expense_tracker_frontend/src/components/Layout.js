import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./layout.css";

// PUBLIC_INTERFACE
export function Layout({ children, onToggleTheme, theme }) {
  /** App shell with header and sidebar navigation. */
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">💧</span> Expense Tracker
        </Link>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>
      <div className="content-wrap">
        <aside className="sidebar">
          <nav>
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              Dashboard
            </NavLink>
            <NavLink to="/expenses" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              Expenses
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              Analytics
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              Settings
            </NavLink>
          </nav>
        </aside>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
