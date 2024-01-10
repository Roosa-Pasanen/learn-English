const express = require("express"); // Import the express module
const router = express.Router();
const connect = require("../connect.js");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const quer = `SELECT w1.name as lang1, w2.name as lang2
        FROM word as w1 INNER JOIN wordPair INNER JOIN word as w2
        WHERE pairId1 = w1.id AND pairId2 = w2.id
        AND langPairId = ${1};`;
    //get data
    const wordbank = await connect.findData(quer);
    res.send(wordbank);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
