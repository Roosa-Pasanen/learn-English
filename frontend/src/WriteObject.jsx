import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScoreContext from "./ScoreContext";

import { Card, Container, Row, Col } from "react-bootstrap";

/**
 * Component with a question and a field for answering. Can be graded
 *
 * @param {{word1, word2, check}} props - word1 --> The question prompt
 *                                        word2 --> The correct answer
 *                                        check --> Whether or not the right
 *                                                  answer should be shown
 * @returns The component
 */
export default function WriteObject(props) {
  // Stores the question prompt
  const [prompt] = useState(props.word1);
  // Stores the correct answer
  const [cAnswer] = useState(props.word2);
  // Stores whether or not the right answer should be shown
  const [check, setCheck] = useState(props.check);

  // Stores the user's answer
  const [answer, setAnswer] = useState("");

  // Whether or not the answer has been graded
  const [hasBeenGraded, setHasBeenGraded] = useState(false);
  // Displays score
  const { scoreState, setScoreState } = useContext(ScoreContext);

  /**
   * Updates props
   */
  useEffect(() => setCheck(props.check), [props.check]);

  /**
   * Adds 1 to the score if the answer is correct.
   * Removes 1 if the answer is incorrect.
   * hasBeenGraded prevents multiple triggers.
   */
  useEffect(() => {
    if (answer == cAnswer && !hasBeenGraded) {
      setHasBeenGraded(true);
      let newScore = scoreState + 1;
      setScoreState(newScore);
      console.log(newScore);
    }
    if (answer !== cAnswer && hasBeenGraded) {
      setHasBeenGraded(false);
      let newScore = scoreState - 1;
      setScoreState(newScore);
      console.log(newScore);
    }
  }, [answer]);

  /**
   * Determines what component state should be displayed
   * @returns The correct component state
   */
  const toCheck = () => {
    if (!check) {
      return test();
    } else if (answer == cAnswer) {
      return correct();
    } else {
      return incorrect();
    }
  };

  /**
   * Stores the UI for the answering state
   * @returns The stored state
   */
  const test = () => {
    return (
      <Card className="m-2">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div className="mx-3">{prompt}</div>
          <input
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
          ></input>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Stores the state of the component when it has been answered to correctly
   * @returns The stored state
   */
  const correct = () => {
    return (
      <Card className="m-2">
        <Card.Body>
          <Container>
            <Row className="align-items-center">
              <Col>{prompt}</Col>
              <Col>{answer}</Col>
              <Col className="text-bg-success rounded">
                <div>Correct!</div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Stores the state of the component when it has been answered to incorrectly
   * @returns The stored state
   */
  const incorrect = () => {
    return (
      <Card className="m-2">
        <Card.Body>
          <Container>
            <Row className="align-items-center">
              <Col>{prompt}</Col>
              <Col>{answer}</Col>
              <Col className="text-bg-danger rounded">
                <div>Answer:</div>
                <div>{cAnswer}</div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  };

  return toCheck();
}
