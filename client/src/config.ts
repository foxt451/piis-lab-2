const config = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:3010",
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || "ws://localhost:3010",
} as const;

export { config };
