const express = require("express"); // Import the express module
const router = express.Router();
const connect = require("../connect.js");
router.use(express.json());

/**
 * Path for fetching information
 */
router.get("/", async (req, res) => {
  try {
    connect
      .selectAll(1)
      .then((data) => {
        if (data.length !== 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send();
        }
      })
      .catch((err) => {
        res.status(500).send();
        res.json(err);
      });
  } catch (err) {
    res.json(err);
  }
});

/**
 * Path for put requests to the "word" database table
 */
router.put("/word/:id([0-9]+)", async (req, res) => {
  try {
    connect
      .updateWord(req.params.id, req.body.name)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send();
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
});

/**
 * Path for delete requests regarding words
 */
router.delete("/word", async (req, res) => {
  try {
    connect
      .deleteWord(req.body.id1, req.body.id2)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send();
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
});

/**
 * Path for post requests regarding words
 */
router.post("/word", async (req, res) => {
  try {
    connect
      .postWord(
        req.body.langId1,
        req.body.langId2,
        req.body.name1,
        req.body.name2
      )
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send();
        res.json(err);
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
