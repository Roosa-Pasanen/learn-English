import { useState, useEffect, useContext } from "react";
import connector from "./utils/connector.js";
import UpdateContext from "./UpdateContext.jsx";

export default function DisplayObject(props) {
  const [prompt, setPrompt] = useState(props.word1);
  const [answer, setAnswer] = useState(props.word2);
  const [isEditing, setIsEditing] = useState(false);
  const [newPrompt, setNewPrompt] = useState(props.word1);
  const [newAnswer, setNewAnswer] = useState(props.word2);
  const { setUpdateState } = useContext(UpdateContext);
  const [editable, setEditable] = useState(props.editable);

  useEffect(() => {
    setPrompt(props.word1);
    setAnswer(props.word2);
    setEditable(props.editable);
  }, [props.word1, props.word2, props.editable]);

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
              setIsEditing(false);
              toSave(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              toSave(true);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              deleteObject();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const display = () => {
    if (editable) {
      return (
        <div>
          {prompt} - {answer}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div>
          {prompt} - {answer}
        </div>
      );
    }
  };

  const toSave = (save) => {
    if (save) {
      if (props.wordId1 == -1) {
        connector.postWord(
          () => {
            setUpdateState(true);
          },
          newPrompt,
          props.langId1,
          newAnswer,
          props.langId2
        );
        setPrompt("New word");
        setAnswer("Translation");
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

  const deleteObject = () => {
    connector.deleteEntry(
      () => {
        setUpdateState(true);
      },
      props.wordId1,
      props.wordId2,
      "word"
    );
  };

  const isEditable = () => {
    if (!isEditing) {
      return display();
    } else {
      return editing();
    }
  };

  return isEditable();
}
