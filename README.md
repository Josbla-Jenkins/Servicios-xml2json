Api conversion de xml a json

corre en localhost:4300/converter/"url-a-convertir" (las " no van no seas...)

Recibe como parametro una url o un archivo xml y lo convierte a json y viceversa.
La url no necesita ser normalizada para realizar la conversión.

No tienes que preocuparte de nada es suficientemente inteligente para saber diferenciar entre un xml y json 
y hacer la conversion adecuada.

para entregarle el archivo se debe usar localhost:4300/upload tienes que enviar el archivo por metodo POST
y el nombre del input debe ser "file".

Para asegurame de que no tengas que ir a stack overflow te dejare esto:

<form action='http://localhost:4300/upload' method="POST" enctype="multipart/form-data">
  <input type="file" class="col-6" name="file">
  <button type="submit">Subir...</button>
</form>

Así tambien me aseguro de no ver tu rostro en las cajas de leche despues:
el comando de ejecucion es npm start.

node 8.11 + typescript 3.3 + nodemon 1.8.1

algo no menos importante: TS y ts-node deben estar instaldos de manera global.

proximanete se montara en heroku.

