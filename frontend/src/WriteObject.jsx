import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card } from "react-bootstrap";

export default function WriteObject(props) {
  const [prompt] = useState(props.word1);
  const [cAnswer] = useState(props.word2);
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(props.check);

  useEffect(() => setCheck(props.check), [props.check]);

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

  const grading = () => {
    if (answer == cAnswer) {
      return (
        <Card className="m-2">
          <Card.Body>
            <div className="d-flex justify-content-around align-items-center">
              <div>{prompt}</div>
              <div> {answer} </div>
              <p>Correct!</p>
            </div>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className="m-2">
          <Card.Body className="d-flex justify-content-around align-items-center">
            <div className="d-flex justify-content-around align-items-center">
              <div>{prompt}</div>
              <div> {answer} </div>
              <p>Correct answer: {cAnswer}</p>
            </div>
          </Card.Body>
        </Card>
      );
    }
  };

  const toCheck = () => {
    if (!check) {
      return test();
    } else {
      return grading();
    }
  };

  return toCheck();
}
