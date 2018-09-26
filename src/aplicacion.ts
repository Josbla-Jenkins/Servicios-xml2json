import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';
import xml2js from './leonidas/xml2js';
import * as strictUriEncode from 'strict-uri-encode';
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



class Aplicacion {

    public express : any;
    public esXml : boolean;

    constructor(){
        this.express = express();
        
        this.express.use(fileUpload({
            safeFileNames : true,
            preserveExtension : true
            }
        ));

        this.express.use(function returnUrl(solicitud, respuesta, next){
            let url : string = solicitud.url;
            let urlParameter : string = url.substr(11, url.length);

            if(urlParameter != null && urlParameter != ''){

                if(urlParameter.indexOf('/') > -1 || urlParameter.indexOf(':')> -1){
                    urlParameter = strictUriEncode(urlParameter);
                }
                solicitud.url = `/converter/${urlParameter}`;
            }   
            next(); 
        });

        this.Ruteador();
    }

    private Ruteador() : void {

        let router : any = express.Router();

        router.post('/upload', (solicitud : any, respuesta : any) => {

            let EDFile = solicitud.files.file;

            if(EDFile != null){
                let filePath : string = `./assets/files-uploaded/`;
                let fileInName : string = `${EDFile.name}`;
                
                EDFile.mv(filePath+fileInName, error =>{
                    if(error){
                        return respuesta.status(500).send({mensaje: error});
                    }else{
                        this.leerArchivoYConvertir(filePath, fileInName, respuesta);
                    }
                });
            }else{
                respuesta.status(500).send({mensaje:'Error verifique nombre del input en el front end'});
            } 
        });

        router.get('/converter/:url', (solicitud : any, respuesta : any)=>{
            this.esXml = null;
            let xmlOJson : string = solicitud.params.url;
            xmlOJson = this.requestXml(xmlOJson);
            this.detectarXmlOJson(xmlOJson);

            if(this.esXml){

                xml2js.Conversion(xmlOJson, function(resultado){
                    respuesta.status(200).send(resultado);
                });

            }else if(this.esXml == false){

                console.log('Aun no tengo el modulo de conversion de xml a json');
                respuesta.status(200).send({mensaje: 'OK'});

            }else if(this.esXml == null){

                console.log('Que huea me pasaste hermano?');
                respuesta.status(200).send({mensaje: 'Archivo invalido'});
            }
        });

        this.express.use('/', router);
    }

    public requestXml(xml : string){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', xml, false);
        xhr.send();
        return xhr.responseText;
    }

    public leerArchivoYConvertir(filePath: string, fileInName: string, respuesta : any){

        this.esXml = null;
        let fileOutName : string = 'convertedXml2Json.json';
        let fileOutPath : string = `./assets/files-converted/`;

        fs.readFile(filePath+fileInName,'latin1',(error, data)=>{
            if(error){

                console.log(error);
                respuesta.status(500).send({mensaje : error});
            } 
            else{
                this.detectarXmlOJson(data);
                if(this.esXml){
                    xml2js.Conversion(data, function(resultado){
                        fs.writeFile(fileOutPath+fileOutName,resultado,(error)=>{
                            if(error)
                                console.log(error);
                            else
                                respuesta.download(fileOutPath+fileOutName,fileOutName, function(error){
                                    if(error){
                                        console.log(error);
                                        respuesta.status(500).send({mensaje: error});
                                    }else
                                        respuesta.status(200).send({mensaje: 'OK'});
                                });
                        });
                    });
                }else if(this.esXml == false){

                    console.log('Aun no tengo el modulo de conversion de json a xml');
                    respuesta.status(200).send({mensaje: 'OK'});

                } else if (this.esXml == null) {

                    console.log('Que huea me pasate hermano?');
                    respuesta.status(200).send({mensaje: 'Archivo invalido'});
                }
                    
            }
        });
    }
    public detectarXmlOJson(data: string){

        if(data != null && data != ''){
            
            if (data.substr(0,5) == '<?xml'){

                this.esXml = true;
                return this.esXml;

            }else if(data.substr(0,1) =='{'){

                this.esXml = false;
                return this.esXml;
            }else{
                this.esXml = null;
                return this.esXml;
            }
        }
    }
}

export default new Aplicacion().express;