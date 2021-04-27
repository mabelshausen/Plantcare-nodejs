const mysql = require("mysql");

let config = {
    "host": "localhost",
    "user": "plantcareuser",
    "password" : "password",
    "database": "plantcare",
    "port": "3306"
};

function row2room(row) {
    return {
        id: row.id,
        name: row.name
    }
}


function getRooms(cb) {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error("Could not set up connection.");
            cb(err);
        } else {
            let sql = "SELECT * from `rooms`;";
            connection.query(sql, (err, rows) => {
                connection.end();
                if (err) {
                    console.error("Could not perform query.");
                    return cb(err);
                } else {
                    return cb(err, rows.map(row2room));
                }
            });

        }
    });
}

function createRoom(name, cb) {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
       if (err) {
           console.error("Could not set up connection.");
           cb(err);
       } else {
           let sql = "INSERT INTO `rooms`(`name`) VALUES(?);";
           connection.query(sql, [name], (err, result) => {
              if (err) {
                  console.error("Could not perform query.");
                  cb(err);
              } else {
                  cb(err, true);
              }
           });
       }
    });
}

function getRoomById(id, cb) {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error("Could not set up connection.");
            cb(err);
        } else {
            //TODO: add validation
            let sql = "SELECT * from `rooms` WHERE `id` = ?;";
            connection.query(sql, [id], (err, rows) => {
                connection.end();
                if (err) {
                    console.error("Could not perform query.");
                    return cb(err);
                } else {
                    return cb(err, row2room(rows[0]));
                }
            });
        }
    });
}

function deleteRoom(id, cb) {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error("Could not set up connection.");
            cb(err);
        } else {
            let sql = "DELETE FROM `rooms` WHERE `id` = ?;";
            connection.query(sql, [id], (err, result) => {
                connection.end();
                if (err) {
                    console.error("Could not perform query.");
                    return cb(err);
                } else {
                    return cb(err, true);
                }
            });
        }
    });
}

module.exports = {
    getRooms,
    createRoom,
    getRoomById,
    deleteRoom
}