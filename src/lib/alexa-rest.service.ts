import 'reflect-metadata';
import { Action, createExpressServer, UnauthorizedError } from 'routing-controllers';
import * as express from 'express';
import { Container, Service } from 'typedi';
import { isNullOrUndefined } from 'util';
import * as https from 'https';
import { AlexaAdapter } from '../main';

export class UserProfile {
    constructor(public email: string) { }
}

export class AlexaRestService {

    private app: express.Express;

    constructor(private adapter: AlexaAdapter) {

        Container.get(Logger).setLogger(adapter.log);
        Container.get(AdapterHolder).setAdapter(adapter);

        this.app = createExpressServer({
            controllers: [__dirname + '/alexa-controller.js'],
            middlewares: [__dirname + '/request-logger.js'],
            defaultErrorHandler: true,
            currentUserChecker: this.currentUserChecker
        });
        this.app.listen(8080);
    }

    private async currentUserChecker(action: Action): Promise<UserProfile> {
        console.log('try to reslolve current user');
        return await getUserProfileFromContext(action);
    }


    public static getTokenFromHeader(authorizationHeader: string): string {
        if (isNullOrUndefined(authorizationHeader)) {
            throw new UnauthorizedError('Missing Authorization Header');
        }
        let bearerIndex = authorizationHeader.indexOf('Bearer ');
        if (bearerIndex !== 0) {
            throw new UnauthorizedError('Invalid Authorization Header');
        }
        return authorizationHeader.substr(7);
    }
}

async function getUserProfileFromContext(action: Action): Promise<UserProfile> {

    const requestContext = Container.of(action.request).get(RequestContext);
    if (isNullOrUndefined(requestContext) || isNullOrUndefined(requestContext.userProfile)) {
        const token = AlexaRestService.getTokenFromHeader(action.request.headers['authorization']);
        const email = await resolveEmail(token);
        const freshUserProfile = new UserProfile(email);
        requestContext.userProfile = freshUserProfile;
        return freshUserProfile;
    }
    return requestContext.userProfile;
}

async function resolveEmail(token: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

        https.get('https://api.amazon.com/user/profile?access_token=' + token, function (res) {

            let responseString = '';

            // accept incoming data asynchronously
            res.on('data', chunk => {
                responseString = responseString + chunk;
            });

            // return the data when streaming is complete
            res.on('end', () => {
                console.log(responseString);
                let response = JSON.parse(responseString);
                resolve(response.email);

            });

        }).on('error', function () {
            reject('error');
        });
    });

}

@Service()
export class Logger {
    public setLogger(log: ioBroker.Logger): void {
        this.delegate = log;
    }
    private delegate: ioBroker.Logger;

    public info(message: string): void {
        this.delegate.info(message);
    }
}

@Service()
export class AdapterHolder {
    public setAdapter(adapter: ioBroker.Adapter): void {
        this.adapter = adapter;
    }
    private adapter: ioBroker.Adapter;

    public getAdapter(): ioBroker.Adapter {
        return this.adapter;
    }
}

@Service()
export class RequestContext {
    get userProfile(): UserProfile {
        return this._userProfile;
    }

    set userProfile(value: UserProfile) {
        this._userProfile = value;
    }

    private _userProfile: UserProfile;


}
