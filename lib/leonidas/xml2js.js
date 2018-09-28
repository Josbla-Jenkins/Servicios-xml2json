"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leonidas = require("xml2js");
class Xml2jsWorker {
    constructor() {
    }
    conversion(xml, callback) {
        if (xml != null && xml != '') {
            let conversionCadena = leonidas.parseString;
            conversionCadena(xml, (err, result) => {
                if (err)
                    return err;
                else {
                    result = JSON.stringify(result);
                    callback(result);
                }
            });
        }
        else {
            return { mensaje: 'vacio' };
        }
    }
    reconstruir(json, callback) {
        if (json != undefined) {
            let builder = new leonidas.Builder({ cdata: true });
            let xml = builder.buildObject(json);
            callback(xml);
        }
        else {
            return { mensaje: 'vacio' };
        }
    }
}
exports.default = new Xml2jsWorker();
//# sourceMappingURL=xml2js.js.map