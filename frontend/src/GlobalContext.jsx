import React from "react";

const GlobalContext = React.createContext({
  adminState: false,
  setAdminState: () => {},
});

export default GlobalContext;
