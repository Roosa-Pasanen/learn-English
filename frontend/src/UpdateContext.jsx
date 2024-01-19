import React from "react";

/**
 * Stores if a component should be updated
 */
const UpdateContext = React.createContext({
  updateState: false,
  setUpdateState: () => {},
});

export default UpdateContext;
