"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leonidas = require("xml2js");
class Xml2jsWorker {
    constructor() {
    }
    Conversion(xml) {
        let conversionCadena = leonidas.parseString;
        if (xml != null && xml != '') {
            conversionCadena(xml, function (error, resultado) {
                return resultado;
            });
        }
        else {
            return { mensaje: 'vacio' };
        }
    }
}
exports.default = new Xml2jsWorker();
//# sourceMappingURL=xml2js.js.map