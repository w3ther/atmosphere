// `http` is a standard library
// built into node.
import http from "http";
import { weatherCreate } from "./weatherData";

// Create a new server instance.
var server = http.createServer();

// Our GUN setup from the last example.
var Gun = require("gun");
var path = require("gun/lib/path");
Gun.path = path;
export var gun = Gun({ web: server });

// Start the server on port 8080.
server.listen(8080, function () {
  console.log("Server listening on http://localhost:8080/gun");
});

const weatherNodeId = "WN_USA_TEAMFAKE_1";
var weatherNode = gun.get(weatherNodeId).put({
  id: weatherNodeId,
  zipCode: "30337",
  country: "USA",
  city: "Atlanta",
  state: "GA",
  team: "TEAMFAKE",
  data: {},
});

const weatherDataTempNode = weatherCreate(weatherNodeId);
weatherNode.path("data").set(weatherDataTempNode);

const weatherNodes = gun.get("weatherNodes");

weatherNodes.set(weatherDataTempNode);
