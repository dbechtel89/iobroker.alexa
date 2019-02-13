import {
    CurrentUser,
    Get,
    JsonController,
    Body,
    Post
} from 'routing-controllers';
import { UserProfile, Logger, AdapterHolder } from './alexa-rest.service';
import Container from 'typedi';
import { AlexaRequest, AlexaNamespace } from './model/alexa-request';
import { registeredAlexaRequestHandler } from './request-handler/alexa-request-handler';


@JsonController('/alexa')
export class AlexaController {

    private logger: Logger;
    private adapter: ioBroker.Adapter;

    constructor() {
        this.logger = Container.get(Logger);
        this.adapter = Container.get(AdapterHolder).getAdapter();
    }

    @Get()
    async test(): Promise<string> {
        return 'Hallo Alexa';
    }

    @Post()
    async handleRequest(@CurrentUser({ required: true }) userProfile: UserProfile, @Body() alexaRequest: AlexaRequest): Promise<void> {
        this.logger.info(`Request for ${userProfile.email}`);

        this.logger.info(JSON.stringify(alexaRequest));

        registeredAlexaRequestHandler.forEach((h: any) => {
            h(alexaRequest);
        })
        return;
    }

}

