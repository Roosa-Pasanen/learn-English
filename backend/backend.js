const express = require("express"); // Import the express module
const app = express(); // Create an instance of an express application
const router = require("./routes/wordBank.js");
const { connect, close } = require("/.connect.js");
const port = 8080; // Define the port on which the server will run

let server = undefined;
connect((err) => {
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

app.use("/api/wordbank", router);
