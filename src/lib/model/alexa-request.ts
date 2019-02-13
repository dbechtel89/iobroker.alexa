
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

export interface AlexaRequest {
    directive: AlexaDirective;
}
export interface AlexaDirective {

    header: RequestHeader;
    payload: RequestPayload;
}

export interface RequestPayload {
    scope: PayloadScope;
}

export interface PayloadScope {
    type: string;
    token: string;
}

export interface RequestHeader {
    namespace: AlexaNamespace;
    name: AlexaRequestName;
    payloadVersion: "3";
    messageId: string;
}

export enum AlexaNamespace {
    AlexaDiscovery = 'AlexaDiscovery'
}

export enum AlexaRequestName {
    Discover = 'Discover'
}