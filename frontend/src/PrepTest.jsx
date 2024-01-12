import connector from "./utils/connector.js";
import DisplayObject from "./DisplayObject.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrepTest() {
  const [displayState, setDisplayState] = useState("...");
  const [promptList, setPromptList] = useState([]);

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
        <DisplayObject
          key={i}
          word1={l[i].word1}
          word2={l[i].word2}
          wordId1={l[i].wordId1}
          wordId2={l[i].wordId2}
          langId1={l[i].langId1}
          langId2={l[i].langId2}
        />
      );
      fullList.push(temp);
    }
    callback(fullList);
  };

  useEffect(() => {
    const dataFetch = () => {
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
  }, []);

  return (
    <div>
      <div>{displayState}</div>
      <button>
        <Link to={"begin"} state={{ prompts: promptList }}>
          {"Begin"}
        </Link>
      </button>
    </div>
  );
}
