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

const id = 2;

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

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err));

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err)); 

//Promise Hell

// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => {
//                 console.log('El empleador', empleado, 'tiene un sueldo de: ', salario);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     })
//     .catch(err => {
//         console.log(err);
//     })

// Promesas en Cadena

let nombre = '';

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log(`El empleado ${nombre} tiene un salario de: ${salario}`))
    .catch(err => console.log(err));