import { useState, useEffect, useContext } from "react";
import connector from "./utils/connector.js";
import UpdateContext from "./UpdateContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Card } from "react-bootstrap";

/**
 * React component which displays two strings.
 *
 * Displays two strings passed to it as props. These can be set to be editable
 * by passing "true" in the props.editable
 *
 * @param {{word1, word2, editable}} props - Passed down props
 *                                         - word1 -> first word as string
 *                                         - word2 -> second word as string
 *                                         - editable -> whether the object can be edited as boolean
 * @returns The DisplayObject
 */
export default function DisplayObject(props) {
  // Stores the first string's value
  const [prompt, setPrompt] = useState(props.word1);
  // Stores the second string's value
  const [answer, setAnswer] = useState(props.word2);
  // Stores whether or not the component can be edited
  const [editable, setEditable] = useState(props.editable);

  // Stores whether or not the component is currently being edited
  const [isEditing, setIsEditing] = useState(false);
  // Stores the currently edited first string's value
  const [newPrompt, setNewPrompt] = useState(props.word1);
  // Stores the currently edited first string's value
  const [newAnswer, setNewAnswer] = useState(props.word2);

  // Called when permanent changes are made to update the parent object
  const { setUpdateState } = useContext(UpdateContext);

  /**
   * Updates prop values in the states
   */
  useEffect(() => {
    setPrompt(props.word1);
    setAnswer(props.word2);
    setEditable(props.editable);
  }, [props.word1, props.word2, props.editable]);

  /**
   * Determines whether or not the component is being edited
   * @returns The appropriate state
   */
  const isBeingEdited = () => {
    if (isEditing || props.wordId1 == -1) {
      // If component is being edited or the object is new
      return editDisplay();
    } else if (editable) {
      // If component can be edited but it currenlty isn't
      return canEditDisplay();
    } else {
      return display();
    }
  };

  /**
   * Stores the component in a state where it's currently being edited
   * @returns The stored state
   */
  const editDisplay = () => {
    return (
      <Card className="m-2">
        <Card.Body className="align-items-center">
          <div className="d-flex justify-content-between">
            <input
              className="mx-1"
              type="text"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
            ></input>
            <input
              className="mx-1"
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></input>
          </div>
          <div className="mt-2">
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
            {deleteButton()}
          </div>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Returns the delete button if the information isn't new
   * @returns the delete button
   */
  const deleteButton = () => {
    if (props.wordId1 !== -1) {
      // wordId1 == -1 --> New object
      return (
        <button
          onClick={() => {
            setIsEditing(false);
            deleteObject();
          }}
        >
          Delete
        </button>
      );
    }
  };

  /**
   * Stores the component in a non-editing state where it can be set to an
   * editing state
   * @returns The stored state
   */
  const canEditDisplay = () => {
    return (
      <Card className="m-2">
        <Card.Body className="d-flex justify-content-around align-items-center">
          <div>
            {prompt} - {answer}
          </div>
          <Button
            variant="light"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Stores the component in a non-editing state where it is unable to be
   * edited.
   * @returns The stored state
   */
  const display = () => {
    return (
      <Card className="m-2">
        <Card.Body className="mb-2">
          <Card.Text style={{ fontSizeAdjust: "0.6" }}>
            {prompt} - {answer}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  /**
   * Used for saving changes and reverting local changes
   * @param {booelan} save
   */
  const toSave = (save) => {
    if (save) {
      // Should information be saved?
      if (props.wordId1 == -1) {
        //word.id == -1 -> A new object
        connector.postWord(
          () => {
            setUpdateState(true);
          },
          newPrompt,
          props.langId1,
          newAnswer,
          props.langId2
        );
        // Reset the new object
        setPrompt("New word");
        setAnswer("Translation");
      } else {
        if (prompt !== newPrompt) {
          // If there's changes in the first word
          connector.putEntry(
            (e) => {
              console.log(e);
            },
            props.wordId1,
            newPrompt,
            "word"
          );
          setPrompt(newPrompt); // Update locally
        }
        if (answer !== newAnswer) {
          // If there's changes in the second word
          connector.putEntry(
            (e) => {
              console.log(e);
            },
            props.wordId2,
            newAnswer,
            "word"
          );
          setAnswer(newAnswer); // Update locally
        }
      }
    } else {
      // If information shouldn't be changed
      setNewPrompt(prompt); // Reset any changes
      setNewAnswer(answer); // Reset any changes
    }
  };

  /**
   * Method for deleting the object's information from the database
   */
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

  return isBeingEdited();
}
