import app from './aplicacion';

let port : any = process.env.PORT;

app.listen(port, (error : any) =>{
    if(error){
        return console.log(`Ocrrio el siguiente error ${error}`);
    }else{
        return console.log(`El servicio esta activo y escuchando en el puerto: ${port}`);
    }
});