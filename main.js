var createError = require('http-errors');
var express = require('express');
var http = require('http');
var cors = require('cors');

const data = require("./data");

var app = express();
var port = '8000';
app.set('port', port);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendStatus(404);
});

app.use("/api/*", (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/api/rooms", (req, res) => {
    data.getRooms()
        .then(rooms => {
            res.json(rooms);
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
        });
});

app.post("/api/rooms", (req, res) => {
    let body = req.body;
    data.createRoom(body.name)
        .then(id => {
            res.end(id.toString());
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
            res.sendStatus(500);
        });
});

app.get("/api/rooms/:id", (req, res) => {
    let id = req.params["id"];
    data.getRoomById(id)
        .then(room => {
            res.json(room);
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
        });
});

app.put("/api/rooms/:id", (req, res) => {
   let id = req.params["id"];
    let body = req.body;
   data.updateRoom(id, body)
       .then(id => {
           res.end(id.toString());
       })
       .catch(err => {
           console.error("Something went wrong: ", err);
           res.sendStatus(500);
       });
});

app.delete("/api/rooms/:id", (req, res) => {
   let id = req.params["id"];
   data.deleteRoom(id)
       .then(() => {
           res.sendStatus(204);
       })
       .catch(err => {
           console.error("Something went wrong: ", err);
           res.sendStatus(500);
       });
});

app.get("/api/plants", (req, res) => {
    data.getPlants()
        .then(plants => {
            res.json(plants);
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
        });
});

app.post("/api/plants", (req, res) => {
    let body = req.body;
    data.createPlant(body.name, body.sciName, body.age, body.room_id, body.waterFreq)
        .then(id => {
            res.end(id.toString());
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
            res.sendStatus(500);
        });
});

app.get("/api/plants/:id", (req, res) => {
    let id = req.params["id"];
    data.getPlantById(id)
        .then(plant => {
            res.json(plant);
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
        });
});

app.put("/api/plants/:id", (req, res) => {
    let id = req.params["id"];
    let body = req.body;
    data.updatePlant(id, body)
        .then(id => {
            res.end(id.toString());
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
            res.sendStatus(500);
        });
});

app.delete("/api/plants/:id", (req, res) => {
    let id = req.params["id"];
    data.deletePlant(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.error("Something went wrong: ", err);
            res.sendStatus(500);
        });
});

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


var server = http.createServer(app);
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});