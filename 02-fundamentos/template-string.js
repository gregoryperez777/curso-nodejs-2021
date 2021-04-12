const nombre = 'Deadpool';
const real = 'Wade Winston';

const normal = nombre + ' ' + real
const template = `${nombre} ${1 + 1}: ${real}`;

console.log('nombre', normal);
console.log('template', template);


const html = `
<h1> Hola </h1>
<p>mundo</p>
`;

// esta comilla ` se llama backticks
// y con ella hacemos uso de template string
// Nos permite trabajar con forma de desarrollo multilinea de 
// manera sencilla

console.log('html', html);