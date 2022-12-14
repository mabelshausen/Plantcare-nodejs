const Database = require("./mysql-database");
var database = new Database();

function row2room(row) {
    return {
        id: row.id,
        name: row.name
    }
}

function row2plant(row) {
    return {
        id: row.id,
        name: row.name,
        sciName: row.sciName,
        age: row.age,
        room_id: row.room_id,
        waterFreq: row.waterFreq,
        lastWatered: row.lastWatered
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
        .then(res => {
            return database.close()
                .then(() => { return res.insertId; });
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
                .then(() => { return id; });
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

function getPlants() {
    let sql = "SELECT * from `plants`;";
    return database.query(sql)
        .then(rows => {
            return database.close()
                .then(() => { return rows.map(row2plant); });
        }, err => {
            return database.close()
                .then(() => { throw err; });
        });
}

function createPlant(name, sciName, age, room_id, waterFreq) {
    let sql = "INSERT INTO `plants`(`name`, `sciName`, `age`, `room_id`, `waterFreq`, `lastWatered`) VALUES(?, ?, ?, ?, ?, ?);";
    return database.query(sql, [name, sciName, age, room_id, waterFreq, new Date()])
        .then(res => {
            return database.close()
                .then(() => { return res.insertId; });
        }, err => {
            return database.close()
                .then(() => { throw err; });
        });
}

function getPlantById(id) {
    let sql = "SELECT * from `plants` WHERE `id` = ?;";
    return database.query(sql, [id])
        .then(rows => {
            return database.close()
                .then(() => { return row2plant(rows[0]); });
        }, err => {
            return database.close()
                .then(() => { throw err; });
        });
}

function updatePlant(id, body) {
    let sql = "UPDATE `plants` SET `name` = ?, `sciName` = ?, `age` = ?, `room_id` = ?, `waterFreq` = ?, `lastWatered` = ? WHERE `id` = ?;";
    return database.query(sql, [body.name, body.sciName, body.age, body.room_id, body.waterFreq, new Date(body.lastWatered), id])
        .then(() => {
            return database.close()
                .then(() => { return id; });
        }, err => {
            return database.close()
                .then(() => { throw err; });
        });
}

function deletePlant(id) {
    let sql = "DELETE FROM `plants` WHERE `id` = ?;";
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
    deleteRoom,
    getPlants,
    createPlant,
    getPlantById,
    updatePlant,
    deletePlant
}