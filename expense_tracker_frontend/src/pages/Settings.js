import React from "react";
import { getEnv, isMockApiEnabled } from "../config/env";

// PUBLIC_INTERFACE
export function SettingsPage() {
  /** Displays environment details relevant to the app. */
  const env = getEnv();
  return (
    <div className="grid" style={{ gap: 20 }}>
      <h2>Settings</h2>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Environment</h3>
        <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{JSON.stringify(
  {
    nodeEnv: env.nodeEnv,
    apiBase: env.apiBase,
    useMockApi: isMockApiEnabled(),
    logLevel: env.logLevel,
    features: env.featureFlags,
  },
  null,
  2
)}
        </div>
      </div>
    </div>
  );
}
