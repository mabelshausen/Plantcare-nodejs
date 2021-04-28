const mysql = require("mysql");

let config = {
    "host": "localhost",
    "user": "plantcareuser",
    "password" : "password",
    "database": "plantcare",
    "port": "3306"
};

class Database {

    query(sql, args) {
        return new Promise((successCb, failedCb) => {
            this.connection = mysql.createConnection(config);
            this.connection.query(sql, args, (err, rows) => {
               if (err) {
                   console.error("Could not perform query.");
                   failedCb(err);
               } else {
                   successCb(rows);
               }
            });
        });
    }

    close() {
        return new Promise((successCb, failedCb) => {
           this.connection.end(err => {
               if (err) {
                   console.error("Could not close connection.");
                   failedCb(err);
               }
               else {
                   successCb();
               }
           });
        });
    }
}

module.exports = Database