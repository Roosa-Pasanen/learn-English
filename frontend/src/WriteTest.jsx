import { useLocation, Link } from "react-router-dom";
import { useState, useContext } from "react";
import WriteObject from "./WriteObject.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Alert } from "react-bootstrap";

export default function WriteTest() {
  const location = useLocation();
  const [checkState, setCheckState] = useState(false);
  const [translateToState, setTranslateToState] = useState("");
  const { scoreState } = useContext(ScoreContext);

  const createList = () => {
    let promptList = location.state.prompts;
    if (promptList.length == 0 || promptList == undefined) {
      return <div>Error: No content</div>;
    }
    let questionList = [];
    if (!location.state.langSwap) {
      if (translateToState == "") {
        setTranslateToState(promptList[0].lang2);
      }
      for (let i = 0; i < promptList.length; i++) {
        questionList.push(
          <WriteObject
            key={i}
            word1={promptList[i].word1}
            word2={promptList[i].word2}
            check={checkState}
          />
        );
      }
    } else {
      if (translateToState == "") {
        setTranslateToState(promptList[0].lang1);
      }
      for (let i = 0; i < promptList.length; i++) {
        questionList.push(
          <WriteObject
            key={i}
            word1={promptList[i].word2}
            word2={promptList[i].word1}
            check={checkState}
          />
        );
      }
    }
    return (
      <div>
        <div> Translate to {translateToState}</div>
        {questionList}
      </div>
    );
  };

  const submitBlock = () => {
    if (!checkState) {
      return submitAnswers();
    } else {
      return grading();
    }
  };

  const submitAnswers = () => {
    return (
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          setCheckState(true);
        }}
      >
        Submit
      </Button>
    );
  };

  const grading = () => {
    return (
      <div>
        <div>
          <Alert variant={"info"}>
            You scored {scoreState}/{location.state.prompts.length}!
          </Alert>
        </div>
        <Button variant="light" size="lg">
          <Link className="link-dark" to={""}>
            {"Back"}
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <div className="m-3">
      <div>{createList()}</div>
      <div>{submitBlock()}</div>
    </div>
  );
}
