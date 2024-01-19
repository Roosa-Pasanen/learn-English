import connector from "./utils/connector.js";
import DisplayObject from "./DisplayObject.jsx";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UpdateContext from "./UpdateContext.jsx";
import GlobalContext from "./GlobalContext.jsx";
import ScoreContext from "./ScoreContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form } from "react-bootstrap";

export default function PrepTest() {
  const [displayState, setDisplayState] = useState("Loading...");
  const [promptList, setPromptList] = useState([]);
  const [isSwapped, setIsSwapped] = useState(false);
  const [languages, setLanguages] = useState("loading...");
  const [updateState, setUpdateState] = useState(false);
  const value = { updateState, setUpdateState };
  const { adminState } = useContext(GlobalContext);
  const { setScoreState } = useContext(ScoreContext);

  /**
   * A function for parsing object lists into text lists
   *
   * @param {object} l - list of objects
   * @param {string} end1 - object key 1
   * @param {string} end2 - object key 2
   * @param {string} s - character or string that separates the keys
   * @returns - Parsed list
   */

  const plainList = (l, callback) => {
    const swapText = `${l[0].lang2} to ${l[0].lang1}`;
    setLanguages(swapText);
    let fullList = [];
    for (let i = 0; i < l.length; i++) {
      const temp = (
        <UpdateContext.Provider value={value} key={i}>
          <DisplayObject
            word1={l[i].word1}
            word2={l[i].word2}
            wordId1={l[i].wordId1}
            wordId2={l[i].wordId2}
            langId1={l[i].langId1}
            langId2={l[i].langId2}
            editable={adminState}
          />
        </UpdateContext.Provider>
      );
      fullList.push(temp);
    }
    callback(fullList);
  };

  const addObject = () => {
    if (adminState) {
      return (
        <UpdateContext.Provider value={value}>
          <DisplayObject
            word1={"New word"}
            word2={"Translation"}
            wordId1={-1}
            wordId2={-1}
            langId1={1} //Change when language support added
            langId2={2} //Change when language support added
            editable={adminState}
          />
        </UpdateContext.Provider>
      );
    }
  };

  useEffect(() => {
    const dataFetch = () => {
      setUpdateState(false);
      try {
        setTimeout(() => {
          connector.fetchInfo((res) => {
            setPromptList(res);
            plainList(res, (res) => {
              setDisplayState(res);
            });
          });
        }, 50);
      } catch (err) {
        console.log(err);
      }
    };
    dataFetch();
  }, [updateState, setUpdateState, adminState]);

  return (
    <div className="m-3">
      <Button
        variant="info"
        size="lg"
        onClick={() => {
          setScoreState(0);
        }}
      >
        <Link
          className="link-dark"
          to={"begin"}
          state={{ prompts: promptList, langSwap: isSwapped }}
        >
          {"Begin Test!"}
        </Link>
      </Button>
      <Form>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label={languages}
          onChange={() => {
            isSwapped ? setIsSwapped(false) : setIsSwapped(true);
          }}
        />
      </Form>
      <div>{displayState}</div>
      <div>{addObject()}</div>
    </div>
  );
}
