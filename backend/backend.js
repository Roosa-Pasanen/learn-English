const express = require("express"); // Import the express module
require("dotenv").config();
const app = express(); // Create an instance of an express application
const router = express.Router();
const port = 8080; // Define the port on which the server will run
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});
router.use(express.json());
