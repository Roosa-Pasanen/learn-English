import React from "react";

/**
 * Stores score variables
 */
const ScoreContext = React.createContext({
  scoreState: [],
  setScoreState: () => {},
});

export default ScoreContext;
