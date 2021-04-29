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

function updateRoom(id, body) {
    let sql = "UPDATE `rooms` SET `name` = ? WHERE `id` = ?;";
    return database.query(sql, [body.name, id])
        .then(() => {
            return database.close()
                .then(() => { return true; });
        }, err => {
           return database.close()
               .then(() => { throw err; });
        });
}

function deleteRoom(id) {
    let sql = "DELETE FROM `rooms` WHERE `id` = ?;";
    return database.query(sql, [id])
        .then(() => {
            database.close()
                .then(() => { return true; });
        }, err => {
            database.close()
                .then(() => { throw err; });
        });
}

module.exports = {
    getRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
}