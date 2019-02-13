import { AlexaRequestHandler } from "./alexa-request-handler";
import { AlexaRequest } from "../model/alexa-request";


@AlexaRequestHandler()
export class DiscoveryRequestHandler {

    constructor(alexaRequest: AlexaRequest) {
        console.log('DiscoveryRequestHandler with: ' + JSON.stringify(alexaRequest));
    }
}