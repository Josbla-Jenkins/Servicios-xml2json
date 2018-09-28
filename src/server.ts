import app from './aplicacion';

//usar esta linea en produccion
let port : any = process.env.PORT;
//esta en dev.
// let port : any = 4300;

app.listen(port, (error : any) =>{
    if(error){
        return console.log(`Ocrrio el siguiente error ${error}`);
    }else{
        return console.log(`El servicio esta activo y escuchando en el puerto: ${port}`);
    }
});