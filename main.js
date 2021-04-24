var createError = require('http-errors');
var express = require('express');
var http = require('http');

var app = express();
var port = '8000';
app.set('port', port);

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
   //TODO
    res.json({});
});

app.get("/api/rooms/:id", (req, res) => {
    //TODO
    res.json({});
});

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


var server = http.createServer(app);
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});