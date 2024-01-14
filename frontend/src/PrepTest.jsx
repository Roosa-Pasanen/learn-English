import connector from "./utils/connector.js";
import DisplayObject from "./DisplayObject.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateContext from "./UpdateContext.jsx";

export default function PrepTest() {
  const [displayState, setDisplayState] = useState("Loading...");
  const [promptList, setPromptList] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const value = { updateState, setUpdateState };

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
    let fullList = [];
    for (let i = 0; i < l.length; i++) {
      const temp = (
        <UpdateContext.Provider value={value}>
          <DisplayObject
            key={i}
            word1={l[i].word1}
            word2={l[i].word2}
            wordId1={l[i].wordId1}
            wordId2={l[i].wordId2}
            langId1={l[i].langId1}
            langId2={l[i].langId2}
          />
        </UpdateContext.Provider>
      );
      fullList.push(temp);
    }
    callback(fullList);
  };

  const addObject = () => {
    return (
      <UpdateContext.Provider value={value}>
        <DisplayObject
          word1={"New word"}
          word2={"Translation"}
          wordId1={-1}
          wordId2={-1}
          langId1={1} //Change when language support added
          langId2={2} //Change when language support added
        />
      </UpdateContext.Provider>
    );
  };

  useEffect(() => {
    const dataFetch = () => {
      setUpdateState(false);
      try {
        connector.fetchInfo((res) => {
          setPromptList(res);
          plainList(res, (res) => {
            setDisplayState(res);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    dataFetch();
  }, [updateState]);

  return (
    <div>
      <button>
        <Link to={"begin"} state={{ prompts: promptList }}>
          {"Begin"}
        </Link>
      </button>
      <div>{displayState}</div>
      <div>{addObject()}</div>
    </div>
  );
}
