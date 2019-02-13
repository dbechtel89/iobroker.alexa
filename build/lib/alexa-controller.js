"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const routing_controllers_1 = require("routing-controllers");
const alexa_rest_service_1 = require("./alexa-rest.service");
const typedi_1 = require("typedi");
let AlexaController = class AlexaController {
    constructor() {
        this.logger = typedi_1.default.get(alexa_rest_service_1.Logger);
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'Hallo Alexa';
        });
    }
    handleRequest(userProfile, alexaRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Request for ${userProfile.email}`);
            this.logger.info(JSON.stringify(alexaRequest));
            return;
        });
    }
};
__decorate([
    routing_controllers_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlexaController.prototype, "test", null);
__decorate([
    routing_controllers_1.Post(),
    __param(0, routing_controllers_1.CurrentUser({ required: true })), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [alexa_rest_service_1.UserProfile, Object]),
    __metadata("design:returntype", Promise)
], AlexaController.prototype, "handleRequest", null);
AlexaController = __decorate([
    routing_controllers_1.JsonController('/alexa'),
    __metadata("design:paramtypes", [])
], AlexaController);
exports.AlexaController = AlexaController;
