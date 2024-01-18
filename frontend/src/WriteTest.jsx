import { useLocation } from "react-router-dom";
import { useState } from "react";
import WriteObject from "./WriteObject.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Button } from "../node_modules/react-bootstrap";

export default function WriteTest() {
  const location = useLocation();
  const [checkState, setCheckState] = useState(false);

  const createList = () => {
    const promptList = location.state.prompts;
    if (promptList.length == 0 || promptList == undefined) {
      return <div>Error: No content</div>;
    }
    let questionList = [];
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
