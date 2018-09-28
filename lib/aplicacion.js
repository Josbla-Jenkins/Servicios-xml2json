"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const xml2js_1 = require("./leonidas/xml2js");
const strictUriEncode = require("strict-uri-encode");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class Aplicacion {
    constructor() {
        this.extension = null;
        this.express = express();
        this.express.use(fileUpload({
            safeFileNames: true,
            preserveExtension: 4
        }));
        this.express.use(function returnUrl(req, res, next) {
            let url = req.url;
            let urlParameter = url.substr(11, url.length);
            if (urlParameter != null && urlParameter != '') {
                if (urlParameter.indexOf('/') > -1 || urlParameter.indexOf(':') > -1) {
                    urlParameter = strictUriEncode(urlParameter);
                }
                req.url = `/converter/${urlParameter}`;
            }
            next();
        });
        this.Ruteador();
    }
    Ruteador() {
        let router = express.Router();
        router.post('/upload', (req, res) => {
            let EDFile = req.files.file;
            if (EDFile != null) {
                let filePath = `./assets/files-uploaded/`;
                let fileInName = `${EDFile.name}`;
                EDFile.mv(filePath + fileInName, (err) => {
                    if (err) {
                        return res.status(500).send({ mensaje: err });
                    }
                    else {
                        this.leerArchivoYConvertir(filePath, fileInName, res);
                    }
                });
            }
            else {
                res.status(500).send({ mensaje: 'err verifique nombre del input en el front end' });
            }
        });
        router.get('/converter/:url', (req, res) => {
            this.esXml = null;
            let xmlOJson = req.params.url;
            xmlOJson = this.requestXml(xmlOJson);
            this.detectarXmlOJson(xmlOJson);
            if (this.esXml) {
                xml2js_1.default.conversion(xmlOJson, (result) => {
                    res.status(200).send(result);
                });
            }
            else if (this.esXml == false) {
                let json = JSON.parse(xmlOJson);
                xml2js_1.default.reconstruir(json, (xml) => {
                    res.status(200).send(xml);
                });
            }
            else if (this.esXml == null) {
                console.log('Que huea me pasaste hermano?');
                res.status(200).send({ mensaje: 'Archivo invalido' });
            }
        });
        this.express.use('/', router);
    }
    requestXml(xml) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', xml, false);
        xhr.send();
        return xhr.responseText;
    }
    leerArchivoYConvertir(filePath, fileInName, res) {
        this.esXml = null;
        let fileOutName = null;
        let fileOutPath = `./assets/files-converted/`;
        fs.readFile(filePath + fileInName, 'latin1', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ mensaje: err });
            }
            else {
                this.detectarXmlOJson(data);
                if (this.esXml) {
                    this.extension = '.json';
                    fileOutName = `${fileInName.substr(0, (fileInName.length - 4))}${this.extension}`;
                    xml2js_1.default.conversion(data, (result) => {
                        fs.writeFile(fileOutPath + fileOutName, result, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({ mensaje: err });
                            }
                            else {
                                res.download(fileOutPath + fileOutName, fileOutName, (err) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send({ mensaje: err });
                                    }
                                });
                            }
                        });
                    });
                }
                else if (this.esXml == false) {
                    let json = JSON.parse(data);
                    this.extension = '.xml';
                    fileOutName = `${fileInName.substr(0, (fileInName.length - 5))}${this.extension}`;
                    xml2js_1.default.reconstruir(json, (xml) => {
                        xml = this.regularizacionesXml(xml);
                        fs.writeFile(fileOutPath + fileOutName, xml, (err) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({ mensaje: err });
                            }
                            else {
                                res.download(fileOutPath + fileOutName, fileOutName, (err) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send({ mensaje: err });
                                    }
                                });
                            }
                        });
                    });
                }
                else if (this.esXml == null) {
                    console.log('Que huea me pasate hermano?');
                    res.status(200).send({ mensaje: 'Archivo invalido' });
                }
            }
        });
    }
    detectarXmlOJson(data) {
        if (data != null && data != '') {
            if (data.substr(0, 5) == '<?xml') {
                this.esXml = true;
                return this.esXml;
            }
            else if (data.substr(0, 1) == '{' || data.substr(0, 1) == '[') {
                this.esXml = false;
                return this.esXml;
            }
            else {
                this.esXml = null;
                return this.esXml;
            }
        }
    }
    regularizacionesXml(xml) {
        let reg = /&lt;/g;
        let reg1 = /&gt;/g;
        let reg2 = /&#xD;/g;
        xml = xml.replace(reg, '<');
        xml = xml.replace(reg1, '>');
        xml = xml.replace(reg2, '');
        return xml;
    }
}
exports.default = new Aplicacion().express;
//# sourceMappingURL=aplicacion.js.map