import { useState, useEffect } from "react";

export default function DisplayObject(props) {
  const [prompt] = useState(props.lang1);
  const [answer] = useState(props.lang2);
  const [editable, setEditable] = useState(false);
  const [newPrompt, setNewPrompt] = useState(props.lang1);
  const [newAnswer, setNewAnswer] = useState(props.lang2);

  useEffect(() => {}, [props.lang1, props.lang2]);

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

  const isEditable = () => {
    console.log(editable);
    if (!editable) {
      return display();
    } else {
      return editing();
    }
  };

  return isEditable();
}
