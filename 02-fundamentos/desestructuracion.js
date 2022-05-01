const deadpool = {
    nombre: 'wade',
    apellido: 'Winstosn',
    poder: 'Regeneración',

    getNombre() {
        return `${this.nombre} ${this.apellido}`;
    }
}

// lo que se quiere evitar

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

// solucion es6
// const { nombre, apellido, poder, edad = 0 } = deadpool;
// console.log(nombre, apellido, poder);

// sin desestructurar los argumentos
// function imprimeHeroe( heroe ) {
//     const { nombre, apellido, poder, edad = 0 } = heroe;
//     console.log(nombre, apellido, poder);    
// }

// Desestructurando los argumentos
// function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
//     console.log(nombre, apellido, poder);    
// }

// imprimeHeroe(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];

// lo que se quiere evitar
// const h1 = heroes[0]
// const h2 = heroes[1]
// const h3 = heroes[2]

// const [ h1, h2, h3 ] = heroes;
// console.log(h1, h2, h3);

// ahora si solo queremos un valor

const [ , , h3 ] = heroes;

console.log( h3 );


