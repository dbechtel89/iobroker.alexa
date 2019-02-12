"use strict";
let requestLogger = (request, response, next) => {
    console.info(`${(new Date()).toUTCString()}|${request.method}|${request.url}|${request.ip}`);
    next();
};
module.exports = requestLogger;
