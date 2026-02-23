// Set log out function to null.
let logoutFunction = null;

// Set log out fn to logout fn after user log in.
const setLogoutFunction = (fn) => {
  logoutFunction = fn;
};

// Call logout after axiosInstance refresh error occur.
const triggerLogout = () => {
  if (logoutFunction) logoutFunction();
};

export default { setLogoutFunction, triggerLogout };
