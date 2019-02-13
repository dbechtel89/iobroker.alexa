"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeredAlexaRequestHandler = [];
function AlexaRequestHandler() {
    return function (target) {
        exports.registeredAlexaRequestHandler.push(target);
    };
}
exports.AlexaRequestHandler = AlexaRequestHandler;
