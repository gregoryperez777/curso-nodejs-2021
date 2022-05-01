const color = require('colors');
const Tarea = require('./tarea');

class Tareas {
    _listado = [];

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        }); 
        return listado;
    }


    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {
        tareas.map(tarea => {
            this._listado[tarea.id] = tarea;
        });
    } 

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn !== null ?  'Completada'.green : 'Pendiente'.red;

            console.log(`${idx}. ${descripcion} :: ${estado}`);
        });
    }

    listarTareasPorEstado(completada = true) {
        console.log('\n');
        let idx = 0;
        this.listadoArr.forEach((tarea, index) => {
            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn !== null ?  'Completada'.green : 'Pendiente'.red;


            if (completada) {

                if(completadoEn) {
                    idx = idx + 1;
                    console.log(`${idx.toString().green}. ${descripcion} :: ${completadoEn}`);
                } 

            } else {

                if(!completadoEn) {
                    idx = idx = idx + 1;
                    console.log(`${idx.toString().green}. :: ${estado}`);
                } 
            }
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;    
            }
        });
    }
}

module.exports = Tareas;