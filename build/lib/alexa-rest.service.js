"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const util_1 = require("util");
const https = require("https");
class UserProfile {
    constructor(email) {
        this.email = email;
    }
}
exports.UserProfile = UserProfile;
class AlexaRestService {
    constructor(adapter) {
        this.adapter = adapter;
        typedi_1.Container.get(Logger).setLogger(adapter.log);
        this.app = routing_controllers_1.createExpressServer({
            controllers: [__dirname + '/alexa-controller.js'],
            middlewares: [__dirname + '/request-logger.js'],
            defaultErrorHandler: true,
            currentUserChecker: this.currentUserChecker
        });
    }
    currentUserChecker(action) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('try to reslolve current user');
            return yield getUserProfileFromContext(action);
        });
    }
    static getTokenFromHeader(authorizationHeader) {
        if (util_1.isNullOrUndefined(authorizationHeader)) {
            throw new routing_controllers_1.UnauthorizedError('Missing Authorization Header');
        }
        let bearerIndex = authorizationHeader.indexOf('Bearer ');
        if (bearerIndex !== 0) {
            throw new routing_controllers_1.UnauthorizedError('Invalid Authorization Header');
        }
        return authorizationHeader.substr(7);
    }
    run() {
        this.app.listen(8080);
    }
}
exports.AlexaRestService = AlexaRestService;
function getUserProfileFromContext(action) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestContext = typedi_1.Container.of(action.request).get(RequestContext);
        if (util_1.isNullOrUndefined(requestContext) || util_1.isNullOrUndefined(requestContext.userProfile)) {
            const token = AlexaRestService.getTokenFromHeader(action.request.headers['authorization']);
            const email = yield resolveEmail(token);
            const freshUserProfile = new UserProfile(email);
            requestContext.userProfile = freshUserProfile;
            return freshUserProfile;
        }
        return requestContext.userProfile;
    });
}
function resolveEmail(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
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
    });
}
let Logger = class Logger {
    setLogger(log) {
        this.delegate = log;
    }
    info(message) {
        this.delegate.info(message);
    }
};
Logger = __decorate([
    typedi_1.Service()
], Logger);
exports.Logger = Logger;
let RequestContext = class RequestContext {
    get userProfile() {
        return this._userProfile;
    }
    set userProfile(value) {
        this._userProfile = value;
    }
};
RequestContext = __decorate([
    typedi_1.Service()
], RequestContext);
exports.RequestContext = RequestContext;
