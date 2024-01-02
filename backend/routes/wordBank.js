const express = require("express"); // Import the express module
const router = express.Router();
const connect = require("../connect.js");
router.use(express.json());

module.exports = router;
