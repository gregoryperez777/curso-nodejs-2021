require('dotenv').config();

const { leerInputs, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busqueda = require('./models/busquedas');

const main = async () => {
    const busqueda = new Busqueda(); 
    let opt = '';
    
    do {
        opt = await inquirerMenu();
        switch(opt) {
            case 1:
                // Mostra mensaje
                const termino = await leerInputs('Ciudad: ');

                // Buscar los lugares 
                const lugares = await busqueda.ciudad(termino);
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
                
                if (id === '0') continue;

                // Guarda en DB
                busqueda.agregarHistorial(lugarSeleccionado.nombre);

                // Clima
                const informacionClimatica =  await busqueda.clima(lugarSeleccionado.lat, lugarSeleccionado.lng);

                // Mostrar Resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ', informacionClimatica.temp);
                console.log('Mínima: ', informacionClimatica.min);
                console.log('Máxima: ', informacionClimatica.max);
                console.log('Descripcion: ', informacionClimatica.descripcion);
            break;

            case 2:
                busqueda.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}`.green;

                    console.log(`${idx} ${lugar}`)
                });
            break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0); 
}

main();