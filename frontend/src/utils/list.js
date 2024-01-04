/**
 * A function for parsing object lists into text lists
 *
 * @param {object} l - list of objects
 * @param {string} end1 - object key 1
 * @param {string} end2 - object key 2
 * @param {string} s - character or string that separates the keys
 * @returns - Parsed list
 */

const plainList = (l, end1, end2, s) => {
  let fullList = [];
  for (let i = 0; i < l.length; i++) {
    const temp = (
      <div key={i}>
        {l[i].end1} {s} {l[i + 1].end2}
      </div>
    );
    fullList.push(temp);
  }
  return fullList;
};
