import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as fs from 'fs';
import xml2js from './leonidas/xml2js';
import * as strictUriEncode from 'strict-uri-encode';
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



class Aplicacion {

    public express : any;
    public esXml : boolean;
    public extension : string = null;

    constructor(){
        this.express = express();
        
        this.express.use(fileUpload({
            safeFileNames : true,
            preserveExtension : true
            }
        ));

        this.express.use(function returnUrl(req, res, next){
            let url : string = req.url;
            let urlParameter : string = url.substr(11, url.length);

            if(urlParameter != null && urlParameter != ''){

                if(urlParameter.indexOf('/') > -1 || urlParameter.indexOf(':')> -1){
                    urlParameter = strictUriEncode(urlParameter);
                }
                req.url = `/converter/${urlParameter}`;
            }   
            next(); 
        });

        this.Ruteador();
    }

    private Ruteador() : void {

        let router : any = express.Router();

        router.post('/upload', (req : any, res : any) => {

            let EDFile = req.files.file;

            if(EDFile != null){
                let filePath : string = `./assets/files-uploaded/`;
                let fileInName : string = `${EDFile.name}`;
                
                EDFile.mv(filePath+fileInName, err =>{
                    if(err){
                        return res.status(500).send({mensaje: err});
                    }else{
                        this.leerArchivoYConvertir(filePath, fileInName, res);
                    }
                });
            }else{
                res.status(500).send({mensaje:'err verifique nombre del input en el front end'});
            } 
        });

        router.get('/converter/:url', (req : any, res : any)=>{
            this.esXml = null;
            let xmlOJson : string = req.params.url;
            xmlOJson = this.requestXml(xmlOJson);
            this.detectarXmlOJson(xmlOJson);

            if(this.esXml){

                xml2js.Conversion(xmlOJson, function(result){
                    res.status(200).send(result);
                });

            }else if(this.esXml == false){

                console.log('Aun no tengo el modulo de conversion de xml a json');
                res.status(200).send({mensaje: 'OK'});

            }else if(this.esXml == null){

                console.log('Que huea me pasaste hermano?');
                res.status(200).send({mensaje: 'Archivo invalido'});
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

    public leerArchivoYConvertir(filePath: string, fileInName: string, res : any){

        this.esXml = null;
        let fileOutName : string = null;
        let fileOutPath : string = `./assets/files-converted/`;

        fs.readFile(filePath+fileInName,'latin1',(err, data)=>{
            if(err){

                console.log(err);
                res.status(500).send({mensaje : err});
            } 
            else{
                this.detectarXmlOJson(data);
                if(this.esXml){
                    this.extension = '.json';
                    fileOutName = `${fileInName.substr(0,(fileInName.length-4))}${this.extension}`;
                    xml2js.Conversion(data, function(result){
                        fs.writeFile(fileOutPath+fileOutName,result,(err)=>{
                            if(err)
                                console.log(err);
                            else{
                                res.download(fileOutPath+fileOutName,fileOutName, function(err){
                                    if(err){
                                        console.log(err);
                                        res.status(500).send({mensaje: err});
                                    }else
                                        res.status(200).send({mensaje: 'OK'});
                                });
                            }     
                        });
                    });
                }else if(this.esXml == false){

                    console.log('Aun no tengo el modulo de conversion de json a xml');
                    res.status(200).send({mensaje: 'OK'});

                } else if (this.esXml == null) {

                    console.log('Que huea me pasate hermano?');
                    res.status(200).send({mensaje: 'Archivo invalido'});
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