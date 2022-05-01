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


// El problema aqui es que la función getEmpleado no tiene  
// una forma de diferenciar entre un error y una respuesta 
// correcta 
 
// const getEmpleado = (id, callback) => {
//     const empleado = empleados.find(e => e.id === id);
//     const result;

//     if (empleado) {
//         callback(empleado)
//     } else {
//               if (empleado) {
    resolve(empleado)
} else {
    
}  callback(`Empleado con ${id} no existe`);
//     }
// }

// getEmpleado(3, (empleado) => {
//     console.log(empleado)
// });

/*------------------*/

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre;

    if (empleado) {
        // NULL significa que no hay ningun error
        callback(null, empleado)
    } else {
        callback(`Empleado con ${id} no existe`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(e => e.id === id)?.salario;

    if (salario) {
        callback(null, salario);
    } else {
        callback(`No existe salario para el id: ${id}`);
    }
};

const id = 3;

getEmpleado(id, (err, empleado) => {
    if (err) {
        return console.log(err)
    }
    
    console.log('Nombre del empleado:', empleado);

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }

        console.log(`El empleado ${empleado} tiene un salario de: ${salario}`)
    });
});

