import * as leonidas from 'xml2js';

class Xml2jsWorker {

    constructor(){   
    }
    
    public conversion(xml : string, callback) : any{
        if(xml != null && xml != ''){
            let conversionCadena = leonidas.parseString;
                conversionCadena(xml, (err, result) =>{
                    if(err)
                        return err;
                    else{
                       result = JSON.stringify(result);
                        callback(result);    
                    }
                                 
            });
        }else{
            return {mensaje : 'vacio' };
        }
    }     
    
    public reconstruir(json: object, callback): any{

        if(json != undefined){
            let builder = new leonidas.Builder({cdata: true});
            let xml = builder.buildObject(json);
            callback(xml);
        }else{
            return {mensaje: 'vacio'};
        }
    }
}

export default new Xml2jsWorker();