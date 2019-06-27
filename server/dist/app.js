"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var httpServer = require("http");
var socketIO = require("socket.io");
var socketManager_1 = require("./socketManager");
var app = express();
var http = httpServer.createServer(app);
exports.io = socketIO(http);
var PORT = process.env.PORT || 5000;
exports.io.on('connection', socketManager_1.default);
http.listen(PORT, function () {
    console.log("listening on PORT " + PORT);
});
//# sourceMappingURL=app.js.map