import { useLocation } from "react-router-dom";
import { useState } from "react";
import WriteObject from "./WriteObject.jsx";

export default function WriteTest() {
  const { promptList } = useLocation();
  const [checkState, setCheckState] = useState(false);

  const createList = () => {
    let questionList = [];
    for (let i = 0; i < promptList.length; i++) {
      const temp = (
        <WriteObject
          lang1={promptList[i].lang1}
          lang2={promptList[i].lang2}
          check={checkState}
        />
      );
      questionList.push(temp);
    }

    return { questionList };
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
