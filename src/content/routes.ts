export const routes = [
  { path: "/welcome", use: "First-run create or import" },
  { path: "/unlock", use: "Password unlock" },
  { path: "/dashboard", use: "Balances and primary actions" },
  { path: "/accounts", use: "Account list, pin, hide, order" },
  { path: "/account", use: "Single-account detail" },
  { path: "/add-account", use: "Derive or import another account" },
  { path: "/keyring", use: "Keyring management" },
  { path: "/export", use: "Password-gated secret export" },
  { path: "/send", use: "Native or token send, then review" },
  { path: "/receive", use: "Address and QR" },
  { path: "/faucet", use: "Alphanet faucet claim" },
  { path: "/history", use: "Decoded activity stream" },
  { path: "/settings", use: "Network, lock, window, security" },
  { path: "/reset", use: "Destroy the local vault" },
] as const;

export const routeCount = routes.length;
