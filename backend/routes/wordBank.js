const express = require("express"); // Import the express module
const router = express.Router();
const connect = require("../connect.js");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const quer = `SELECT w1.name as word1, w1.id as wordId1,
        w2.name as word2, w2.id as wordId2,
        l1.id as langId1, l1.name as lang1,
        l2.id as langId2, l2.name as lang2
        FROM language as l1 INNER JOIN word as w1
        INNER JOIN wordPair
        INNER JOIN word as w2 INNER JOIN language as l2
        WHERE pairId1 = w1.id AND pairId2 = w2.id
        AND l1.id = w1.langId AND l2.id = w2.langId
        AND langPairId = ${1};`;
    //get data
    const wordbank = await connect.contact(quer);
    res.send(wordbank);
  } catch (err) {
    res.json(err);
  }
});

router.put("/word/:id([0-9]+)", async (req, res) => {
  try {
    const q = `UPDATE word
  SET name = "${req.body.name}"
  WHERE id = ${req.params.id};`;
    await connect.contact(q);
    res.send("Success!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.delete("/word", async (req, res) => {
  try {
    const q = `DELETE from wordPair WHERE pairId1 = ${req.body.id1} AND
    pairId2 = ${req.body.id2};`;
    await connect.contact(q);
    res.send("Success!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/word", async (req, res) => {
  try {
    // Name, languageid
    const q1Search = `SELECT id from word
    WHERE name = "${req.body.name1}" AND langId = ${req.body.langId1};`;
    const q2Search = `SELECT id from word
    WHERE name = "${req.body.name2}" AND langId = ${req.body.langId2};`;
    let id1 = await connect.contact(q1Search);
    let id2 = await connect.contact(q2Search);
    if (id1[0] == undefined) {
      const insert = `INSERT INTO word (name, langId)
      VALUES ("${req.body.name1}", ${req.body.langId1});`;
      await connect.contact(insert);
      id1 = await connect.contact(q1Search);
    }
    if (id2[0] == undefined) {
      const insert = `INSERT INTO word (name, langId)
      VALUES ("${req.body.name2}", ${req.body.langId2});`;
      await connect.contact(insert);
      id2 = await connect.contact(q2Search);
    }
    const q3 = `INSERT INTO wordPair (pairId1, pairId2, langPairId)
      VALUES (${id1[0].id}, ${id2[0].id}, (SELECT id FROM languagePair
      WHERE pairID1 = ${req.body.langId1} AND pairID2 = ${req.body.langId2}));`;
    await connect.contact(q3);

    res.send("Success!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
