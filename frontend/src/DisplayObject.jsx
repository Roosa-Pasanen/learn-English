import { useState, useEffect, useContext } from "react";
import connector from "./utils/connector.js";
import UpdateContext from "./UpdateContext.jsx";

export default function DisplayObject(props) {
  const [prompt, setPrompt] = useState(props.word1);
  const [answer, setAnswer] = useState(props.word2);
  const [editable, setEditable] = useState(false);
  const [newPrompt, setNewPrompt] = useState(props.word1);
  const [newAnswer, setNewAnswer] = useState(props.word2);
  const { setUpdateState } = useContext(UpdateContext);

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
              toSave(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEditable(false);
              toSave(true);
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

  const toSave = (save) => {
    if (save) {
      console.log(props.wordId1);
      if (props.wordId1 == -1) {
        console.log("post");
        connector.postWord(
          () => {
            setUpdateState(true);
          },
          newPrompt,
          props.langId1,
          newAnswer,
          props.langId2
        );
      } else {
        if (prompt !== newPrompt) {
          connector.putEntry(
            (e) => {
              console.log(e);
            },
            props.wordId1,
            newPrompt,
            "word"
          );
          setPrompt(newPrompt);
        }
        if (answer !== newAnswer) {
          connector.putEntry(
            (e) => {
              console.log(e);
            },
            props.wordId2,
            newAnswer,
            "word"
          );
          setAnswer(newAnswer);
        }
      }
    } else {
      setNewPrompt(prompt);
      setNewAnswer(answer);
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
