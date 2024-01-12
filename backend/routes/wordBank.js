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
        AND l1.id = w1.langId AND l2.id = w2langId
        AND langPairId = ${1};`;
    //get data
    const wordbank = await connect.findData(quer);
    res.send(wordbank);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
