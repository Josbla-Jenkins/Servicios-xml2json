import * as leonidas from 'xml2js';

class Xml2jsWorker {

    constructor(){   
    }
    
    public Conversion(xml : string, callback) : any{
        if(xml != null && xml != ''){
            let conversionCadena = leonidas.parseString;
                conversionCadena(xml, function(error, resultado){
                    if(error)
                        return error;
                    else{
                       resultado = JSON.stringify(resultado);
                        callback(resultado);    
                    }
                                 
            });
        }else{
            return {mensaje : 'vacio' };
        }
    }          
}

export default new Xml2jsWorker();