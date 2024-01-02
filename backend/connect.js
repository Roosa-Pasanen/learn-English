const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

const databaseFunctions = {
  connect: (callback) => {
    connection.connect((err) => {
      //If error, return error, otherwise return nothing
      err ? callback(err) : callback();
    });
  },
  close: (callback) => {
    connection.end((err) => {
      //If error, return error, otherwise return nothing
      console.log("closing");
      err ? callback(err) : callback();
    });
  },
  findData: (q) => {
    return new Promise((resolve, reject) => {
      connection.query(q, (err, result) => {
        // Error handling
        if (err) {
          reject({ err });
        }
        //Return all data
        resolve(result);
      });
    });
  },
};

module.exports = databaseFunctions;
