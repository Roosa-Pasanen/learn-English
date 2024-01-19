import React from "react";

/**
 * Stores global variables
 */
const GlobalContext = React.createContext({
  adminState: false,
  setAdminState: () => {},
});

export default GlobalContext;
