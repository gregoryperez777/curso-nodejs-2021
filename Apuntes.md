## Fundamentos de Node

### ¿Que es Node?

Es un entorno de ejecución de JavaScript orientado a eventos asíncronos, que corre sobre el motor **V8 de google**
el cual traduce javascript a lenguaje maquina. Este nos permite crear Backend con javacript del lado del servidor.  

#### Caracteristicas 

- Lenguaje de Backend.

- Acceso al sistema de Archivos del equipo.

- Información del sistema operativo.

- Información de los procesos del equipo.

### ¿Que puedo hacer con Node?

- Uso de sockets para comunicación en tiempo real cliente-servidor servidor-cliente

- Manejo de Archivos en FileSystem, cargas simultáneas

- Servidores locales y remotos con información en tiempo real

- Conexiones a BD 

- Creaciones de servicios REST

### ¿Por qué es tan popular Node?

- Las entradas y salidas no realizan bloqueos del servidor

- Es sumamente rápido y facil de configurar

- Tiene mas de 470 mil paquete disponible

- Si conoces Javascript ya conocen la mayor parte de Node


### ¿Quienes lo utilizan?

- **Netflix**

- **Paypal**

- **Linkedin**

- **Walmart**

- **Uber**

- **Ebay**

- **Nasa**

### ¿Qué es blocking y non-blocking I/O?

***Blocking***: Se refiere a codigo Javascript que al ejecutarse bloquea el resto de los procesos hasta su completación.

***Non Blocking***: Se refiere a codigo Javascript que al ejecutarse no bloquea el resto de los procesos.

Los metodos _Blocking_ se ejecutan de forma sincrónica  
Los metodos _NON Blocking_ se ejecutan de forma asincrónica

Los metodos _Blocking_ hacen que la ejecusión del codigo sea mucho mas lenta. Es por ello que se recomienda usar metodos _Non Blocking_ para mejorar el rendimiento de las app 

### Realizar nuestro primer programa de Node

`console.log('Hola mundo')`

### Comprender el ciclo de vida de un proceso en Node

El Event Loop de Javascript esta formado por 3 stack: 

- Call stack (Pila de procesos)

- Node Apis

- Queue Callbacks (Son todos los procesos que ya estan listo para ser ejecutados pero hay esperar que la pila de procesos termine con todos los procesos)

Al ejecutar un programa de Node:

1) Node crea un proceso ***main()*** sobre Call stack

2) Toma cada instrucción del codigo, lo carga sobre la call stack, ejecuta la instrucción de ser posible y la elimina una vez ejecuta. En caso de no poder ejecutar la instrucción cargada en la call stack este proceso es pasado a Node Apis donde permanece hasta que pueda ser ejecutado completamente. Una vez que el proceso este listo para ser ejecutado es pasado a Queue Callbacks donde espera hasta que la Call stack este libre y donde posteriormente sera ejecutado y eliminado.

3) Una vez ejecutado cada proceso Node verifica que no hay ninguna instruccion en cada pila y finaliza el proceso

Nota: En la Queue Callbacks se ejecutaran los procesos segun vayan llegando (FIFO)

### Javascript ES6 (Reforzamiento)

#### Variables y Scopes

- Var: Crea variables de scope global

<pre>
#Ejemplo 1 Al reemplazar el valor de la variable en cualquier scope ella adquirirá ese nuevo valor 

var nombre = 'Wolverine';

if (true) {
    nombre = 'Ironman';
}

console.log('nombre', nombre)
// Esto imprimiria Ironman
</pre>

<pre>
#Ejemplo 2 En este caso queremos cambiar el valor de la variable nombre solo dentro del scope de la sentencia if para ello declaramos una nueva variable con el mismo nombre
 
var nombre = 'Wolverine';

if (true) {
    var nombre = 'Ironman';
}

console.log('nombre', nombre)
// Esto imprimiria Ironman

Como puedes observar se cambia de forma global nuevamente.
</pre>


- Let: Crea variables de scope local al bloque, declaración, o expresión donde se está usando

<pre>
#Ejemplo 1 En este caso queremos cambiar el valor de la variable nombre solo dentro del scope de la sentencia if para ello declaramos una nueva variable con el mismo nombre usando let
 
let nombre = 'Wolverine';

if (true) {
    let nombre = 'Ironman';
    console.log('nombre', nombre)
}

console.log('nombre', nombre)
// Esto imprimiria Wolverine

Como puedes observar la variable nombre dentro sentencia if toma como valor 'Ironman' y al finalizar su scope la variable nombre ya no existe pero si existe la variable nombre que fue declarada antes de la sentencia if
</pre>

<pre>
#Ejemplo 2 En este caso queremos reemplazar el valor de la variable nombre en el scope de la sentencia if note que estamos usando la variable que hemos declarado antes de la sentencia if
 
let nombre = 'Wolverine';

if (true) {
    nombre = 'Ironman';
}

console.log('nombre', nombre)
// Esto imprimiria Ironman

Como puedes observar en este caso javascript nota que quiere reemplazar el valor de la variable nombre sin embargo esa variable no existe en el scope de la sentencia if asi que va al scope superior para ver si la encuentra y asi reasignar su valor.
</pre>

- Const: Al igual que let crea variables de scope local al bloque, declaración, o expresión donde se está usando con la diferencia que no puedes redefinir su valor ya que sera constante durante la ejecusion del codigo.

<pre>
#Ejemplo 1 En este caso queremos reemplazar el valor de la variable nombre en el scope de la sentencia if note que hemos nombre como const
 
const nombre = 'Wolverine';

if (true) {
    nombre = 'Ironman';
}

console.log('nombre', nombre)
// Esto imprimiria Ironman

Como puedes observar en este caso obtendras un error ya que no puedes reemplazar el valor de una variable que ha sido declarada como constante

Nota: las variables decladas con const son mas ligeras que las declaradas con let ya que no poseen setter asi que se recomienda que siempre que se pueda utilicemos const para variables para mejorar el rendimiento del codigo.
</pre>

#### Template String:

Los string en javascript han sido siempre muy limitado. Es por ello que en ES6 se incluyó los Template String para proporcionar una mayor funcionaliad en este ámbito.

Las principales funcionalidades que aportan las Template Strings son:

- Interpolación de cadenas.

<pre>
    const nombre = 'Deadpool';
    const real = 'Wade Winston';
    const template = `${nombre} ${real}`;

    console.log('template', template);
    // esto imprimiría  
    // template Deadpool Wade Winston
</pre>

- Posibilidad de incluir (y evaluar) expresiones dentro de cadenas.

<pre>
    const nombre = 'Deadpool';
    const real = 'Wade Winston';
    const template = `${nombre} ${1 + 1}: ${real}`;

    console.log('template', template);
    // esto imprimiría  
    // template Deadpool 2: Wade Winston
</pre>

- Definición de cadenas de texto en varias líneas sin tener que usar hacks.

~~~
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <h1>Hola mundo</h1>
        </body>
        </html>
    `;
    console.log('html', html);
    // esto imprimiría  
    // una pagina básica en html 
~~~

- Cadenas etiquetadas.

~~~
const nombre = 'Carmen'
const ultimaConexion = '01/01/2021';

const msj = `Hola ${nombre}` su ultima conexion fue el ${ultimaConexion}
~~~

Nota: la comilla usada para hacer uso de Template String se llama backticks

#### Desestructuración: 

Es una expresión de JavaScript que permite desempacar valores de arreglos o propiedades de objetos en distintas variables y todo esto 
en una sola linea.

La desestructuración viene a solventar la siguiente situación:

Anteriormente para obtener los valores de un arreglo ú objeto teniamos que extraer propiedad por propiedad

<pre>
    const heroes = ['Deadpool', 'Superman', 'Batman'];
    const h1 = heroes[0];
    const h2 = heroes[1];
    const h3 = heroes[2];
</pre>

Ahora podemos adquirir esos valores en una sola linea 

<pre>
    const [h1, h2, h3] = heroes;
</pre>

Tambien es posible obviar algunos valores para quedarnos solo con los que nos interesan

<pre>
    const [, , h3] = heroes;
</pre>

En el caso de los objetos la situacion era familiar teniamos que acceder a cada propiedad y guardarla en una variable para posteriormente
utilizarla 

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',

        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }


    const nombre = deadpool.nombre;
    const apellido = deadpool.apellido;
    const poder = deadpool.poder;
</pre>

Ahora al igual que con los arrays podemos adquirir esos valores en una sola linea 

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',

        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }

    const { nombre, apellido, poder } = deadpool; 
</pre>

Cabe resaltar que puedes desempacar las propiedad que necesitas 

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',

        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }

    const { nombre, poder } = deadpool; 
</pre>

Al desestructurar es posible colocar variable que no se encuentren en el objeto e inicializarla por default

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',

        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }

    // como sabemos edad no esta presente en el objeto
    // por ende su valor sera undefined pero al 
    // inicializarlo por defecto adquira el valor 0

    const { nombre, apellido, poder, edad = 0 } = deadpool;
</pre>


Tambien es posible utilizar la desestructuracion en el paso de parametros de una función

<pre>
    // sin desestructurar los argumentos
    function imprimeHeroe( heroe ) {
        const { nombre, apellido, poder, edad = 0 } = heroe;
        console.log(nombre, apellido, poder);    
    }

    // Desestructurando los argumentos
    function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
        console.log(nombre, apellido, poder);    
    }
</pre>

Ademas puedes nombrar las propiedades que adquieras con un nombre diferente

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',

        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }

    const {nombre: name, apellido: lastname, poder:power } = deadpool
</pre>

Desestructurando objetos anidados

<pre>
    const deadpool = {
        nombre: 'wade',
        apellido: 'Winstosn',
        poder: 'Regeneración',
        infoComic: {
            fechaEstreno: '21/01/2016',
            director: 'Tim Miller' 
        }
        getNombre() {
            return `${this.nombre} ${this.apellido}`;
        }
    }

    // Acceder a propiedades anidadas
    const { infoComic: { fechaEstreno, director } } = deadpool;

    // Acceder solo a una propiedad
    const { infoComic: { fechaEstreno } } = deadpool;

    // Acceder solo a una propiedades y cambiar el nombre
    const { infoComic: { fechaEstreno: releaseDate, director: manager } } = deadpool;
</pre>

