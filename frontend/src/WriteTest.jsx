import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import WriteObject from "./WriteObject.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "react-bootstrap";

export default function WriteTest() {
  const location = useLocation();
  const [displayState, setDisplayState] = useState();
  const [checkState, setCheckState] = useState(false);
  const { scoreState, setScoreState } = useContext(ScoreContext);

  const grading = () => {
    if (checkState) {
      return (
        <div>
          You scored {scoreState}/{location.state.prompts.length}!
        </div>
      );
    }
  };

  const toRandomize = (list) => {
    let randomized = new Array(list.length - 1);
    for (let i = 0; i < list.length; i++) {
      const index = Math.floor(Math.random * list.length);
      if (list[index] !== undefined) {
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
      if (i == promptList.length - 1) {
        /*setDisplayState(questionList);*/
      }
    }
    return questionList;
  };

  /*toRandomize(promptList, (res) => {
        console.log("moi");
        for (let i = 0; i < res.length; i++) {
          questionList.push(
            <ScoreContext.Provider key={i} value={correct}>
              <WriteObject
                word1={res[i].word1}
                word2={res[i].word2}
                check={checkState}
              />
            </ScoreContext.Provider>
          );
        }
        setDisplayState(questionList);
      });
    };
    createList();
  }, []);*/

  /*useEffect(() => {}, [checkState]);*/

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
