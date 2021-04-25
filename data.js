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
            cb(err);
        } else {
            let sql = "SELECT * from `rooms`;"
            connection.query(sql, (err, rows) => {
                connection.end();
                if (err) {
                    return cb(err);
                } else {
                    return cb(err, rows.map(row2room));
                }
            });

        }
    });
}

module.exports = {
    getRooms
}