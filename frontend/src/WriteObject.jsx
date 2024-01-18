import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Card, Container, Row, Col } from "../node_modules/react-bootstrap";

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
    } else {
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
