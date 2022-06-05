const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {

        const { archivo } = files;
        console.log('archivo --->', archivo);
    
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        // validar la extension    
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida ${extensionesValidas}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
    
            return resolve(nombreTemp);
        });
    })
}

module.exports = {
    subirArchivo
}
