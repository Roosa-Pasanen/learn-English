const express = require("express"); // Import the express module
const cors = require("cors");
const app = express(); // Create an instance of an express application
const router = require("./routes/wordBank.js");
const { connect, close } = require("./connect.js");
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

app.use(cors());
app.use("/apua", express.static("../frontend/dist"));
app.use("/api/wordbank", router);

const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      // Give error message if server closing does not work
      if (err) {
        console.log(err);
      } else {
        console.log("Server stopped.");
      }
    });
    console.log("Starting graceful shutdown... (mysql)");
    close((err) => {
      // Try to close db, give errors is that does not work
      if (err) {
        console.log(err);
      } else {
        console.log("Connection closed.");
      }
    });
  }
  console.log("Shutdown complete.");
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
