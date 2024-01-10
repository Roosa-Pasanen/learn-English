import { useState } from "react";

export default function WriteObject(props) {
  const [prompt] = useState(props.lang1);
  const [cAnswer] = useState(props.lang2);
  const [answer, setAnswer] = useState("");
  const [check] = useState(props.check);

  const test = () => {
    return (
      <div>
        <div>{prompt}</div>
        <input type="text" onChange={(e) => setAnswer(e.target.value)}></input>
      </div>
    );
  };

  const grading = () => {
    if (answer == cAnswer) {
      return (
        <div>
          <div>{prompt}</div>
          <div> {answer} </div>
          <p>Correct!</p>
        </div>
      );
    } else {
      return (
        <div>
          <div>{prompt}</div>
          <div> {answer} </div>
          <p>Correct answer: {cAnswer}</p>
        </div>
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
