import { useLocation } from "react-router-dom";
import { useState } from "react";
import WriteObject from "./WriteObject.jsx";

export default function WriteTest() {
  const location = useLocation();
  const [checkState, setCheckState] = useState(false);

  const createList = () => {
    const promptList = location.state.prompts;
    let questionList = [];
    for (let i = 0; i < promptList.length; i++) {
      questionList.push(
        <WriteObject
          key={i}
          lang1={promptList[i].lang1}
          lang2={promptList[i].lang2}
          check={checkState}
        />
      );
    }
    return <div>{questionList}</div>;
  };

  return (
    <div>
      <div>{createList()}</div>
      <button
        onClick={() => {
          setCheckState(true);
        }}
      >
        Submit
      </button>
    </div>
  );
}
