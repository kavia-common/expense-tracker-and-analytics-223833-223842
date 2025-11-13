//
// Environment configuration for the Expense Tracker frontend
// Reads only REACT_APP_* variables, applies defaults for local dev,
// and exposes a simple interface for other modules.
//
/* eslint-disable no-console */

// PUBLIC_INTERFACE
export function getEnv() {
  /**
   * Returns environment configuration derived from REACT_APP_* variables.
   *
   * - Avoids hard-coded values; expects env to be provided via .env.
   * - Includes feature flags with safe defaults.
   */
  const {
    REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL,
    REACT_APP_FRONTEND_URL,
    REACT_APP_WS_URL,
    REACT_APP_NODE_ENV,
    REACT_APP_NEXT_TELEMETRY_DISABLED,
    REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT,
    REACT_APP_TRUST_PROXY,
    REACT_APP_LOG_LEVEL,
    REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS,
    REACT_APP_EXPERIMENTS_ENABLED,
    NODE_ENV,
  } = process.env;

  const nodeEnv = REACT_APP_NODE_ENV || NODE_ENV || "development";

  // Parse feature flags JSON if provided, else defaults to empty object
  let parsedFlags = {};
  if (REACT_APP_FEATURE_FLAGS) {
    try {
      parsedFlags = JSON.parse(REACT_APP_FEATURE_FLAGS);
    } catch (e) {
      console.warn("Invalid REACT_APP_FEATURE_FLAGS JSON; falling back to empty flags.");
    }
  }

  const config = {
    nodeEnv,
    isProduction: nodeEnv === "production",
    apiBase: REACT_APP_API_BASE || REACT_APP_BACKEND_URL || "",
    frontendUrl: REACT_APP_FRONTEND_URL || "",
    wsUrl: REACT_APP_WS_URL || "",
    telemetryDisabled: REACT_APP_NEXT_TELEMETRY_DISABLED === "true",
    enableSourceMaps: REACT_APP_ENABLE_SOURCE_MAPS !== "false",
    port: REACT_APP_PORT ? Number(REACT_APP_PORT) : undefined,
    trustProxy: REACT_APP_TRUST_PROXY === "true",
    logLevel: REACT_APP_LOG_LEVEL || "info",
    healthcheckPath: REACT_APP_HEALTHCHECK_PATH || "/healthz",
    experimentsEnabled: REACT_APP_EXPERIMENTS_ENABLED === "true",
    featureFlags: {
      useMockApi: (!nodeEnv || nodeEnv !== "production")
        && (parsedFlags.useMockApi === true || parsedFlags.useMockApi === "true"),
      // fallback flags
      ...parsedFlags,
    },
  };

  return config;
}

// PUBLIC_INTERFACE
export function isMockApiEnabled() {
  /** Returns true if mock API should be used (non-production and flag enabled). */
  const env = getEnv();
  return env.featureFlags.useMockApi === true;
}
