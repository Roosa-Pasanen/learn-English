import { useLocation } from "react-router-dom";
import { useState } from "react";
import WriteObject from "./WriteObject.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "react-bootstrap";

export default function WriteTest() {
  const location = useLocation();
  const [checkState, setCheckState] = useState(false);
  const [scoreState, setScoreState] = useState(0);
  const correct = { scoreState, setScoreState };

  const createList = () => {
    const promptList = location.state.prompts;
    if (promptList.length == 0 || promptList == undefined) {
      return <div>Error: No content</div>;
    }
    let questionList = [];
    for (let i = 0; i < promptList.length; i++) {
      questionList.push(
        <ScoreContext.Provider key={i} value={correct}>
          <WriteObject
            word1={promptList[i].word1}
            word2={promptList[i].word2}
            check={checkState}
          />
        </ScoreContext.Provider>
      );
    }
    return <div>{questionList}</div>;
  };

  return (
    <div className="m-3">
      <div>{createList()}</div>
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          setCheckState(true);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
