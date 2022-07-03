"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherCreate = void 0;
const server_1 = require("./server");
const weatherCreate = (weatherNodeID) => {
    // create new weatherData
    const weatherData = {
        temperature: Math.floor(Math.random() * (100 - -100 + 1)) + -100,
        humidity: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
        windSpeed: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
        windDirection: Math.floor(Math.random() * (360 - 0 + 1)) + 0,
    };
    const weatherDataString = `${new Date().getTime()}-${weatherNodeID}`;
    return server_1.gun.get(weatherDataString).put(weatherData);
};
exports.weatherCreate = weatherCreate;
