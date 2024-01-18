import React from "react";

const ScoreContext = React.createContext({
  scoreState: [],
  setScoreState: () => {},
});

export default ScoreContext;
