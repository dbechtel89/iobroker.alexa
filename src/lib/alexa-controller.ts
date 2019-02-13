import {
    CurrentUser,
    Get,
    JsonController,
    Body,
    Post
} from 'routing-controllers';
import { UserProfile, Logger } from './alexa-rest.service';
import Container from 'typedi';


@JsonController('/alexa')
export class AlexaController {

    private logger: Logger;
    constructor() {
        this.logger = Container.get(Logger);
    }

    @Get()
    async test(): Promise<string> {
        return 'Hallo Alexa';
    }

    @Post()
    async handleRequest(@CurrentUser({ required: true }) userProfile: UserProfile, @Body() alexaRequest: any): Promise<void> {
        this.logger.info(`Request for ${userProfile.email}`);

        this.logger.info(JSON.stringify(alexaRequest));
        return;
    }

}

