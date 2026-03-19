// Advanced Session & Token Lifecycle.
const advancedSessionAndTokenLifecycle = [
  {
    id: 1,
    key: "Atomic Token Rotation",
    value: "Refreshing tokens rotates both access & refresh tokens securely.",
  },
  {
    id: 2,
    key: "Refresh Conflict Detection",
    value:
      "Invalid or reused refresh tokens immediately invalidate the session (forced logout).",
  },
  {
    id: 3,
    key: "Session Expiry Synchronization",
    value: "Session lifetime dynamically extends with token refresh.",
  },
  {
    id: 4,
    key: "Session Limiting",
    value:
      "Maximum of 10 active sessions per user with automatic oldest-session eviction.",
  },
  {
    id: 5,
    key: "Global Logout",
    value: "Allows users to terminate all active sessions across devices.",
  },
  {
    id: 6,
    key: "TTL Indexing in Database",
    value: "Automatically removes expired sessions using database indexing.",
  },
];

export default advancedSessionAndTokenLifecycle;
