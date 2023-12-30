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

let server = undefined;
connection.connect((err) => {
  // mysql connection
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  } else {
    console.log("MySQL connection successful.");
    server = app
      .listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(process.env);
      })
      .on("error", (err) => {
        console.error("Error starting server:", err);
        process.exit(1);
      });
  }
});

app.use("/api/wordbank", locationsRouter);
