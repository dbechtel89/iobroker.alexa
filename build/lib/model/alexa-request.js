"use strict";
/**
 * {
    "directive": {
        "header": {
            "namespace": "Alexa.Discovery",
            "name": "Discover",
            "payloadVersion": "3",
            "messageId": "abc-123-def-456"
        },
        "payload": {
            "scope": {
                "type": "BearerToken",
                "token": "access-token-from-skill"
            }
        }
    }
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AlexaNamespace;
(function (AlexaNamespace) {
    AlexaNamespace["AlexaDiscovery"] = "AlexaDiscovery";
})(AlexaNamespace = exports.AlexaNamespace || (exports.AlexaNamespace = {}));
var AlexaRequestName;
(function (AlexaRequestName) {
    AlexaRequestName["Discover"] = "Discover";
})(AlexaRequestName = exports.AlexaRequestName || (exports.AlexaRequestName = {}));
