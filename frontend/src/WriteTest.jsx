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

  const grading = () => {
    if (checkState) {
      return (
        <div>
          Your scored {scoreState}/{location.state.prompts.length - 1}!
        </div>
      );
    }
  };

  const toRandomize = (list) => {
    let randomized = new Array(list.length - 1);
    for (let i = 0; i < list.length; i++) {
      const index = Math.floor(Math.random * list.length);
      if (list[index] == undefined) {
        randomized.push(list[index]);
      } else {
        i--;
      }
    }
    return randomized;
  };

  const createList = () => {
    let promptList = location.state.prompts;
    if (promptList.length == 0 || promptList == undefined) {
      return <div>Error: No content</div>;
    }
    promptList = toRandomize(promptList);
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
      <div>{grading()}</div>
    </div>
  );
}
