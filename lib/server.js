"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aplicacion_1 = require("./aplicacion");
let port = process.env.PORT;
aplicacion_1.default.listen(port, (error) => {
    if (error) {
        return console.log(`Ocrrio el siguiente error ${error}`);
    }
    else {
        return console.log(`El servicio esta activo y escuchando en el puerto: ${port}`);
    }
});
//# sourceMappingURL=server.js.map