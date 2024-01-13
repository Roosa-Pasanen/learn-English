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

router.delete("/word/:id([0-9]+)", async (req, res) => {
  try {
    const q = `DELETE from word WHERE id = ${req.params.id};`;
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
    const q1 = `INSERT INTO word (name, langId)
    VALUES (${req.body.name1}, ${req.body.langId1});`;
    const q2 = `INSERT INTO word (name, langId)
    VALUES (${req.body.name2}, ${req.body.langId2});`;
    const q3 = `INSERT INTO wordPair (pairId1, pairId2, langPairId)
    VALUES (${req.body.langId1}, ${req.body.langId2},
      (SELECT id FROM languagePair WHERE pairID1 = ${req.body.langId1} AND
        pairID2 = ${req.body.langId2}));`;
    await connect.contact(q1);
    await connect.contact(q2);
    await connect.connect(q3);
    res.send("Success!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
