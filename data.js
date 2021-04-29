const mysql = require("mysql");

let config = {
    "host": "localhost",
    "user": "plantcareuser",
    "password" : "password",
    "database": "plantcare",
    "port": "3306"
};

const Database = require("./mysql-database");
var database = new Database();

function row2room(row) {
    return {
        id: row.id,
        name: row.name
    }
}

//TODO: add validation

function getRooms() {
    let sql = "SELECT * from `rooms`;";
    return database.query(sql)
        .then(rows => {
            return database.close()
                .then(() => { return rows.map(row2room); });
        }, err => {
            return database.close()
                .then(() => { throw err; });
        });
}

function createRoom(name) {
    let sql = "INSERT INTO `rooms`(`name`) VALUES(?);";
    return database.query(sql, [name])
        .then(() => {
            return database.close()
                .then(() => { return true; });
        }, err => {
           return database.close()
               .then(() => { throw err; });
        });
}

function getRoomById(id) {
    let sql = "SELECT * from `rooms` WHERE `id` = ?;";
    return database.query(sql, [id])
        .then(rows => {
            return database.close()
                .then(() => { return row2room(rows[0]); });
        }, err => {
           return database.close()
               .then(() => { throw err; });
        });
}

function updateRoom(id, body, cb) {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error("Could not set up connection.");
            cb(err);
        } else {
            let sql = "UPDATE `rooms` SET `name` = ? WHERE `id` = ?;";
            connection.query(sql, [body.name, id], (err, result) => {
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
    updateRoom,
    deleteRoom
}