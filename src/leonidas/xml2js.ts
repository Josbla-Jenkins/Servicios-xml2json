import * as leonidas from 'xml2js';

class Xml2jsWorker {

    constructor(){   
    }
    
    public Conversion(xml : string, callback) : any{
        if(xml != null && xml != ''){
            let conversionCadena = leonidas.parseString;
                conversionCadena(xml, function(err, result){
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
}

export default new Xml2jsWorker();