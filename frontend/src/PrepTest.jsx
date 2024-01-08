import connector from "./utils/connector.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrepTest() {
  const [displayState, setDisplayState] = useState("...");

  /**
   * A function for parsing object lists into text lists
   *
   * @param {object} l - list of objects
   * @param {string} end1 - object key 1
   * @param {string} end2 - object key 2
   * @param {string} s - character or string that separates the keys
   * @returns - Parsed list
   */

  const plainList = (l, s, callback) => {
    let fullList = [];
    for (let i = 0; i < l.length; i++) {
      const temp = <div key={i}>{l[i].fin + s + l[i].eng}</div>;
      fullList.push(temp);
    }
    callback(fullList);
  };

  useEffect(() => {
    const dataFetch = () => {
      try {
        connector.fetchInfo((res) => {
          plainList(res, "-", (res) => {
            setDisplayState(res);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    dataFetch();
  }, []);

  return <div>{displayState}</div>;
}
