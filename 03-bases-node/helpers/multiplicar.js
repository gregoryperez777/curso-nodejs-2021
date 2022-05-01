const colors = require('colors');
const fs = require('fs');

const crearArchivo = async (base = 5, listar = falsel, hasta = 10) => {
    let salida = '';
    let consola = '';

    for (let i = 1; i < hasta+1; i++) {
        salida += `${base} x ${i} = ${base * i}\n`;
        consola = `${colors.cyan(base)} x ${colors.cyan(i)} = ${colors.cyan(base * i)}\n`;
    }

    if (listar) {
        console.clear();
        console.log("=================================".green);
        console.log('Tabla del:'.yellow, `${base}`.yellow);
        console.log("=================================".green);
        console.log(consola);
    }

    // Grabar con writeFile
    // fs.writeFile(`tabla-${base}`, salida, (err) => {
    //     if (err) throw err;
    //     console.log('El archivo se subio con exito');
    // })

    try {
        // es mas sencillo capturar error con try catch
        fs.writeFileSync(`./salida/tabla-${base}`, salida);
        return(`tabla-${base}.txt`);
    } catch (err) {
        throw(err);
    }
}

module.exports = {
    // Nombre con el cual quieres exportar la funcion: funcion dentro de este archivo
    // Pero a menos que queramos exportar la funcion con otro nombre no lo utilizaremos de esta manera 
    // crearArchivo: crearArchivo
    crearArchivo
};