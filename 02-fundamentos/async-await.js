const empleados = [
    {
        id: 1,
        nombre: 'Fernando',
    },
    {
        id: 2,
        nombre: 'Linda',
    },
    {
        id: 3,
        nombre: 'Karen',
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000,
    },
    {
        id: 2,
        salario: 1500,
    },
    {
        id: 3,
    }
];

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        ( empleado ) 
            ? resolve(empleado) 
            : reject(`No existe empleado con id: ${id}`);
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(e => e.id === id)?.salario;
        
        // If ternario
        ( salario ) 
            ? resolve(salario) 
            : reject(`No existe salario para usuario con id: ${id}`);
    })
};

/*
    Async transforma mi funcion en una funcion asincrona que retorna una promesa
*/
const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salarios = await getSalario(id);
        return (`El empleado ${empleado} tiene un salario de: ${salarios}`);
    } catch (err) {
        // Si colocamos return es como si salieramos de forma correcta
        // de la promesa a pesar de tener errores 
        // es decir cuando hagan getInfoUsuario.then() <--- entrara por ahi y no por el catch 
        return err;
        
        // si colocamos throw salimos de la funcion de forma incorrecta 
        // es decir cuando hagan getInfoUsuario.then().catch(err) <--- entrara por el catch 
        throw(err);

        // throw es el reject de async
    }
}


const id = 10;
getInfoUsuario(id)
    .then(msg => {
        console.log('THEN');
        console.log(msg)
    })
    .catch(err => {
        console.log('CATCH');
        console.log(err)
    });