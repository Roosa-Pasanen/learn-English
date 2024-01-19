import { useLocation, Link } from "react-router-dom";
import { useState, useContext } from "react";
import WriteObject from "./WriteObject.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Alert } from "react-bootstrap";

/**
 * Component containing the UI for the writing test
 *
 * @returns The writing test UI
 */
export default function WriteTest() {
  // Stores passed down information
  const location = useLocation();
  // Stores whether or not the test should be graded
  const [checkState, setCheckState] = useState(false);
  // Stores the languages currently being translated to
  const [translateToState, setTranslateToState] = useState("");
  // Stores the score
  const { scoreState } = useContext(ScoreContext);

  /**
   * Creates an array of child components based on information passed on by
   * the previous page
   * @returns the child component array
   */
  const createList = () => {
    let promptList = location.state.prompts;
    if (promptList.length == 0 || promptList == undefined) {
      return <div>Error: No content</div>;
    }
    let questionList = [];
    if (!location.state.langSwap) {
      // If the question and answer should be swapped
      if (translateToState == "") {
        // If translated to language hasn't been set
        setTranslateToState(promptList[0].lang2); // Stores being translated to language
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
        // If translated to language hasn't been set
        setTranslateToState(promptList[0].lang1); // Stores being translated to language
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

  /**
   * Determines the correct state of the end of the testa and returns it
   * @returns The correct state
   */
  const submitBlock = () => {
    if (!checkState) {
      return submitAnswers(); // Returns a submit button
    } else {
      return grading(); // Returns score and a button taking you back to the beginning
    }
  };

  /**
   * Method for storing the submit button
   * @returns The submit button
   */
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

  /**
   * Stores the UI for a graded test
   * @returns The stored UI
   */
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

  /**
   * Error handling for the site
   * @returns error message or the site UI
   */
  const handleError = () => {
    try {
      return (
        <div className="m-3">
          <div>{createList()}</div>
          <div>{submitBlock()}</div>
        </div>
      );
    } catch (err) {
      console.log(err);
      return <div>Oops! It seems like something went wrong!</div>;
    }
  };

  return handleError();
}
