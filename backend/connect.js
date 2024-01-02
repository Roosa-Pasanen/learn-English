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
  connect: () => {
    return new Promise((resolve, reject) => {
      try {
        connection.connect();
        resolve();
      } catch (err) {
        reject(err);
      }
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
