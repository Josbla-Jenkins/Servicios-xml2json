Api conversion de xml a json

corre en localhost:4300/converter/url-a-convertir

ejemplo: localhost:4300/converter/http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=araucania

recibe como parametro una url o un archivo xml y lo convierte a json.
la url no necesita ser normalizada para realizar la conversión.

para entregarle el archivo se debe usar localhost:4300/upload usted tendra que enviar el archivo por metodo POST
y el nombre del input debe ser "file".

el comando de ejecucion es npm start.

node 8.11 + typescript 3.3 + nodemon 1.8.1

proximamente se agregara la conversión de json a xml.

