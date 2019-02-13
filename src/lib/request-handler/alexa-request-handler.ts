export const registeredAlexaRequestHandler: any = [];
export function AlexaRequestHandler() {
    return function (target: Function) {

        registeredAlexaRequestHandler.push(target);
    };
}

