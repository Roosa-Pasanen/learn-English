const express = require("express"); // Import the express module
const cors = require("cors");
const app = express(); // Create an instance of an express application
const router = require("./routes/wordBank.js");
const { connect, close } = require("./connect.js");
const port = 8080; // Define the port on which the server will run

let server = undefined;

/**
 * Opens the mysql and server connections
 */
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

app.use(cors()); // Enable cors
app.use("/", express.static("./frontend/dist")); // Set static content location
app.use("/api/wordbank", router); // Deploy router

/**
 * Closes the mysql connection and server
 */
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

process.on("SIGTERM", gracefulShutdown); // Some other app requires shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
