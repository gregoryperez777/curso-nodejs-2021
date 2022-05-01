require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInputs, 
    listarTareasBorrar, 
    confirmar, 
    mostrarListadosChecklist 
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => {  

    let opt = ''
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    } 

    do {
        console.clear()
        opt = await inquirerMenu();
        let completada = null;

        switch(opt) {
            case '1':
                const descripcion = await leerInputs('Ingrese la descripcion de su nueva tarea');
                tareas.crearTarea(descripcion);   
            break;

            case '2': 
                tareas.listadoCompleto();
            break;

            case '3':
                completada = true;
                tareas.listarTareasPorEstado(completada);
            break;

            case '4':
                completada = false;
                tareas.listarTareasPorEstado(completada);
            break;

            case '5':
                const ids = await mostrarListadosChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listarTareasBorrar(tareas.listadoArr);
                
                if (id !== '0') {
                    const ok = await confirmar('Esta seguro de eliminar esta tarea');
    
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa(); 

    } while (opt !== '0');
}


main();