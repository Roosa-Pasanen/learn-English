import { useState, useEffect } from "react";
import connector from "./utils/connector.js";

export default function DisplayObject(props) {
  const [prompt] = useState(props.word1);
  const [answer] = useState(props.word2);
  const [editable, setEditable] = useState(false);
  const [newPrompt, setNewPrompt] = useState(props.word1);
  const [newAnswer, setNewAnswer] = useState(props.word2);

  useEffect(() => {}, [props.word1, props.word2]);

  const editing = () => {
    return (
      <div>
        <input
          type="text"
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
        ></input>
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></input>
        <div>
          <button
            onClick={() => {
              setEditable(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEditable(false);
              toSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  const display = () => {
    return (
      <div>
        {prompt} - {answer}
        <button
          onClick={() => {
            setEditable(true);
          }}
        >
          Edit
        </button>
      </div>
    );
  };

  const toSave = () => {
    if (prompt !== newPrompt) {
      connector.putEntry({}, props.wordId1, newPrompt, "word");
    }
    if (answer !== newAnswer) {
      connector.putEntry({}, props.wordId2, newAnswer, "word");
    }
  };

  const isEditable = () => {
    if (!editable) {
      return display();
    } else {
      return editing();
    }
  };

  return isEditable();
}
