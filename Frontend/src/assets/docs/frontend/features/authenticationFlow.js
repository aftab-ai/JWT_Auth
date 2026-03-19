// Authentication Flow.
const authenticationFlow = [
  {
    id: 1,
    key: "Protected & Public Routes",
    value: "Route-level access control using custom layouts.",
  },
  {
    id: 2,
    key: "Auth Context System",
    value: "Centralized authentication state using React Context API.",
  },
  {
    id: 3,
    key: "Automatic Token Refresh",
    value: "Axios interceptors handle expired access tokens seamlessly.",
  },
  {
    id: 4,
    key: "CSRF Token Handling",
    value: [
      "Stored in memory (not persistent storage).",
      "Automatically fetched when missing via protected endpoint.",
    ],
  },
];

export default authenticationFlow;
