"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gun = void 0;
// `http` is a standard library
// built into node.
const http_1 = __importDefault(require("http"));
const weatherData_1 = require("./weatherData");
// Create a new server instance.
var server = http_1.default.createServer();
// Our GUN setup from the last example.
var Gun = require("gun");
var path = require("gun/lib/path");
Gun.path = path;
exports.gun = Gun({ web: server });
// Start the server on port 8080.
server.listen(8080, function () {
    console.log("Server listening on http://localhost:8080/gun");
});
const weatherNodeId = "WN_USA_TEAMFAKE_1";
var weatherNode = exports.gun.get(weatherNodeId).put({
    id: weatherNodeId,
    zipCode: "30337",
    country: "USA",
    city: "Atlanta",
    state: "GA",
    team: "TEAMFAKE",
    data: {},
});
const weatherDataTempNode = (0, weatherData_1.weatherCreate)(weatherNodeId);
weatherNode.path("data").set(weatherDataTempNode);
const weatherNodes = exports.gun.get("weatherNodes");
weatherNodes.set(weatherDataTempNode);
