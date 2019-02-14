import { AlexaRequestHandler } from "./alexa-request-handler";
import { AlexaRequest } from "../model/alexa-request";
import { Inject } from "typedi";
import { Logger } from "../alexa-rest.service";


@AlexaRequestHandler()
export class DiscoveryRequestHandler {

    @Inject()
    private logger: Logger;

    constructor(alexaRequest: AlexaRequest) {
        this.logger.info('DiscoveryRequestHandler with: ' + JSON.stringify(alexaRequest));
    }
}