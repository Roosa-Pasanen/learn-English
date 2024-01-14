import React from "react";

const UpdateContext = React.createContext({
  updateState: false,
  setUpdateState: () => {},
});

export default UpdateContext;
