const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

const contact = (q) => {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      // Error handling
      if (err) {
        reject({ err });
      }
      //Return all data
      resolve(result);
    });
  });
};

const databaseFunctions = {
  connect: (callback) => {
    connection.connect((err) => {
      //If error, return error, otherwise return nothing
      err ? callback(err) : callback();
    });
  },
  close: (callback) => {
    connection.end((err) => {
      //If error, return error, otherwise return nothing
      console.log("closing");
      err ? callback(err) : callback();
    });
  },
  selectAll: (langid) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT w1.name as word1, w1.id as wordId1,
        w2.name as word2, w2.id as wordId2,
        l1.id as langId1, l1.name as lang1,
        l2.id as langId2, l2.name as lang2
        FROM language as l1 INNER JOIN word as w1
        INNER JOIN wordPair
        INNER JOIN word as w2 INNER JOIN language as l2
        WHERE pairId1 = w1.id AND pairId2 = w2.id
        AND l1.id = w1.langId AND l2.id = w2.langId
        AND langPairId = ${connection.escape(langid)};`;
      connection.query(q, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  updateWord: (id, name) => {
    return new Promise((resolve, reject) => {
      const q = `UPDATE word SET name = ${connection.escape(name)}
      WHERE id = ${connection.escape(id)};`;
      connection.query(q, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  deleteWord: (id1, id2) => {
    return new Promise((resolve, reject) => {
      const q = `DELETE from wordPair WHERE pairId1 = ${connection.escape(id1)}
      AND pairId2 = ${connection.escape(id2)};`;
      connection.query(q, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  postWord: (langId1, langId2, name1, name2) => {
    return new Promise((resolve, reject) => {
      const p = async () => {
        const q1Search = `SELECT id from word
          WHERE name = ${connection.escape(name1)}
          AND langId = ${connection.escape(langId1)}
          ORDER BY id DESC
          LIMIT 1`;
        const q2Search = `SELECT id from word
          WHERE name = ${connection.escape(name2)}
          AND langId = ${connection.escape(langId2)}
          ORDER BY id DESC
          LIMIT 1`;
        const insert1 = `INSERT INTO word (name, langId)
        VALUES (${connection.escape(name1)}, ${connection.escape(langId1)});`;
        const insert2 = `INSERT INTO word (name, langId)
          VALUES (${connection.escape(name2)}, ${connection.escape(langId2)});`;

        contact(insert1)
          .then(() => contact(insert2).catch((err) => console.log(err)))
          .then(() => {
            const insert3 = `INSERT INTO wordPair (pairId1, pairId2, langPairId)
            VALUES ((${q1Search}), (${q2Search}),
            (SELECT id FROM languagePair
            WHERE pairID1 = ${connection.escape(langId1)}
            AND pairID2 = ${connection.escape(langId2)}));`;
            contact(insert3).catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      };
      try {
        p();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
};

module.exports = databaseFunctions;
