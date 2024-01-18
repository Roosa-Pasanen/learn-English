import React from "react";

const ScoreContext = React.createContext({
  scoreState: false,
  setScoreState: () => {},
});

export default ScoreContext;
