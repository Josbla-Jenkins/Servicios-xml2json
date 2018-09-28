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
    public path : any = require('path');

    constructor(){
        this.express = express();
        
        this.express.use(fileUpload({
            safeFileNames : true,
            preserveExtension : 4
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
                let filePath : string = `/assets/files-uploaded/`;
                let fileInName : string = `${EDFile.name}`;
                
                EDFile.mv(this.path.join(__dirname,`${filePath}${fileInName}`), (err) =>{
                    if(err){
                        return res.status(500).send({mensaje: err});
                    }else{
                        this.leerArchivoYConvertir(this.path.join(__dirname, filePath), fileInName, res);
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

                xml2js.conversion(xmlOJson,(result)=>{
                    res.status(200).send(result);
                });

            }else if(this.esXml == false){
               
                let json = JSON.parse(xmlOJson);
                xml2js.reconstruir(json,(xml)=>{
                    res.status(200).send(xml);
                });

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
                    xml2js.conversion(data,(result)=>{
                        fs.writeFile(this.path.join(__dirname, `/assets/files-converted/${fileOutName}`),result,(err)=>{

                            if(err){
                                console.log(err);
                                res.status(500).send({mensaje: err});
                            } 
                            else{
                                res.download(this.path.join(__dirname, `/assets/files-converted/${fileOutName}`),fileOutName,(err)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send({mensaje: err});
                                    }
                                });
                            }     
                        });
                    });
                }else if(this.esXml == false){

                    let json = JSON.parse(data);
                    this.extension = '.xml';
                    fileOutName = `${fileInName.substr(0,(fileInName.length-5))}${this.extension}`;
                    xml2js.reconstruir(json,(xml)=>{

                        xml = this.regularizacionesXml(xml);

                        fs.writeFile(this.path.join(__dirname,`/assets/files-converted/${fileOutName}`), xml,(err)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send({mensaje: err});
                            }else{
                                res.download(this.path.join(__dirname,`/assets/files-converted/${fileOutName}`),fileOutName,(err)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send({mensaje: err});
                                    }
                                });
                            }
                        });
                    });
                    
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

            }else if(data.substr(0,1) =='{' || data.substr(0,1)=='['){

                this.esXml = false;
                return this.esXml;

            }else{
                this.esXml = null;
                return this.esXml;
            }
        }
    }

    public regularizacionesXml(xml : string){
        let reg = /&lt;/g;
        let reg1 = /&gt;/g;
        let reg2 = /&#xD;/g;
        
        xml = xml.replace(reg, '<');
        xml = xml.replace(reg1, '>');
        xml = xml.replace(reg2, '');
        return xml;
    }
}

export default new Aplicacion().express;