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

#### operador de encadenamiento opcional ó Null Check Operator ?. :

Permite leer el valor de una propiedad ubicada dentro de un objeto si ésta no es null o undefined. 
Funciona de forma similar al operador ***.*** excepto que en lugar de causar un error si la referencia 
es ***null*** ó ***undefined*** el operador hace una evaluacion de circuito corto y retorna undefined.

<pre>
    #Ejemplo 1

    /*
        En muchas ocasiones debemos hacer validaciones de este tipo
    */

    if (obj.first && obj.first.second) {
        // hacer algo
    }

    /*
        Ahora con este nuevo operador podemos hacer lo siguiente
    */

    if (obj.first?.second) {
        // hacer algo
    }

</pre>

Como viste en el ejemplo anterior no es necesario comprobar el estado o valor de obj.first primero 
ya que Javascript verifica implicitamente que obj.first no sea null o undefined antes de tratar de 
acceder a second.

<pre>
    Puede usarse de las siguientes maneras:
        
        obj.val?.prop
        obj.val?.[expr]
        obj.arr?.[index]
        obj.func?.(args)
</pre>

#### Function Arrow:

De este tema debo investigar mas


#### Callback:

Son funciones que se pasan como argumento a otra función donde posteriormente son invocadas.

<pre>

    #Ejemplo 1

    const getUserByID = (id, callback) => {
        
        const user = {
            id,
            nombre: 'Carmen'
        }
        
        setTimeout(() => {
            callback(user)
        }, 1500);
    }

    getUserByID(id, (user) => {
        console.log(user);
    });

    #Ejemplo 2
    const getUserByID = (id, callback) => {
        
        const user = {
            id,
            nombre: 'Carmen'
        }
        
        setTimeout(() => {
            callback(user)
        }, 1500);
    }

    const showUser = (user) => {
        console.log(user);
    } 

    getUserByID(id, showUser);
</pre>

En el ejemplo de arriba existe un problema y es no tiene una forma de diferenciar entre un error y una respuesta 
correcta para ello al momento de retornar el callback el primer parametro se le pasaria null para decir 
que no hubo errores o un msj de error como primer parametro

<pre>
    #Ejemplo 1

    const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre;

    if (empleado) {
        // NULL significa que no hay ningun error
        callback(null, empleado)
    } else {
        callback(`Empleado con ${id} no existe`);
    }
}
</pre>

#### Callback Hell:

El callback hell es un problema comun que ocurre cuando dentro de un callback hacemos o llamamos a mas callback esto 
hace que nuestro codigo sea poco entendible y mantenible con el tiempo

<pre>
    #Ejemplo pequeño ejemplo de un callback dentro de otro

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
</pre>

#### Promise:

Una promesa es un objeto que representa la terminación exitosa o el fracaso de una operación 
asincrona. La misma recibe 2 parametros (resolve y reject) utilizado para resolver o rechazar la promesa segun sea el caso.

Sintaxys:

<pre>
new Promise((resolve, reject) => {
    if (success) {
        resolve()
    } else {
        reject()
    }
})
</pre>

Una Promesa puede encontrarse en uno de los siguientes estados:

- pendiente (pending): estado inicial, no cumplida o rechazada.
- cumplida (fulfilled): significa que la operación se completó satisfactoriamente.
- rechazada (rejected): significa que la operación falló.

#### Promise Hell:

Utilizando promesas tambien podemos hacer un HELL. Lo cual es una mala practica, para ello 
podemos encadenar promesas.  

<pre>

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        ( empleado ) 
            ? resolve(empleado) 
            : reject(`No existe empleado con id: ${id}`);
    });
}

getEmpleado(id)
    .then(empleado => {
        getSalario(id)
            .then(salario => {
                console.log('El empleador', empleado, 'tiene un sueldo de: ', salario);
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    })
</pre>

#### Promise en cadena:

Seguramente en algunas oportunidades vas a necesitar ejecutar una promesa tras otra y como probocar un promise hell es mala practica la solucion es encadenar promesas.

Utilicemos el ejemplo anterior pero ahora como promesas encadenada

<pre>

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id)?.nombre;
        ( empleado ) 
            ? resolve(empleado) 
            : reject(`No existe empleado con id: ${id}`);
    });
}

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log(`El empleado ${nombre} tiene un salario de: ${salario}`))
    .catch(err => console.log(err));
</pre>

Como puedes observar cada .then() recibe lo que la promesa anterior retornar si existe algun error .catch(err) se encargara de manejarlo  

#### Async y Await:

Async y Await son palabras reservadas muy utilizadas cuando trabajamos con promesas.

Async es utilizada para definir una funcion como asincrona cuyo valor de respuesta sera una promesa.

Await por su lado es utilizado para decirle a Javascript que debe esperar que se ejecute la promesa para seguir ejecutando las siguientes lineas de codigo.

Lo mas importante que debes conocer de estos elementos es que para usar await debemos estar entro de una funcion Async.

<pre>
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
    Recuerda que Async transforma mi funcion en una funcion asincrona que 
    retorna una promesa
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
</pre>

### Fundamentos de Node

#### Sistemas de gestión de paquetes 

-   NPM
-   YARN

#### Comandos Basicos NPM 

- npm init: inicializa el proyecto a construir creando un archivo package.json donde posteriormente se alojaran las dependencias y dev dependencias del proyecto

    - **Dependencias**: son aquellas librerias que usaras tanto en el ambiente de produccion como en el de desarrollo.

    - **DevDependencias**: son aquellas librerias que usaras solamente en el ambiente de desarrollo como por ejemplo Nodemond

    ### Inicializando proyecto:

    Puedes ejecutar este comando de esta manera. Acto seguido te pedira informacion que debes completar para crear el package.json

    <pre>
        npm init
    </pre>

    Tambien puedes ejecutarlo de esta manera. De esta forma se creara un package.json con informacion por default que luego podras cambiar.
    <pre>
        npm init -y
    </pre>

    ### Package-lock.json
    
    Indica como fueron construidas las dependencias o como se deben construir las dependencias que estan en el 
    en el proyecto

    ### Instalando paquetes: 

    Los paquetes, librerias o dependencias estan alojadas en npm para verificar si un determinado paquete se encuentran disponible puedes buscarlo en [NPM](https://www.npmjs.com/) 

    Esta es la forma mas comun de instalar una dependencia    
    <pre>
        npm install nombredelpackete
    </pre>

    Tambien existe esta opcion para realizar la instalacion de un paquete 
    <pre>
        npm i nombreDelPaquete
    </pre>

    En ocasiones puedes encontrarte con problemas de compatibilidad entre las versiones de un paquete. Seguramente tu proyecto trabaje bien para una version de un paquete pero para otra no.

    En ese caso si queremos instalar un paquete en una version especifica podemos hacer lo siguiente

    <pre>
        npm install nombreDelPaquete@versionDelPaquete
        npm i nombreDelPaquete@versionDelPaquete
    </pre>

    ### Dependencia ó DevDependencia:
    
    NPM proporciona 2 banderas para indicar si el paquete que se va a instalar es una dependencia o devDependencia.

    [--save, -S] indica que el paquete es una dependencia (El paquete sera usado tanto en ambiente de desarrollo como en producción)

    [--save-dev, -D] indica que el paquete es una DevDependencia (El paquete sera usado solo en ambiente de desarrollo)

    Nota: por default si no se indica una bandera el paquete se tomara como una devDependencia. 

    #### Indicando que se instalara una dependencia
    <pre>
        npm install nombreDelPaquete --save
        npm i nombreDelPaquete -S
    </pre> 

    #### Indicando que se instalara una DevDependencia
    <pre>
        npm install nombreDelPaquete --save-dev
        npm i nombreDelPaquete -D
    </pre>     

    ### Desinstalar paquetes:

    #### Desinstala de la dependencias 
    <pre>
        npm uninstall nombreDelPaquete
    </pre> 

#### Manejando argumento pasado desde la terminal:
    process.argv: es un array que contiene los comandos pasados cuando se inicia la aplicacion de Node. Los primeros 2 elemento del array son los siguientes: 

        - [0]: Donde esta instalado node
        - [1]: Donde esta corriendo la aplicacion
   
    Example
    
    Al ejecutar una aplicacion de la siguiente manera

        node app --base=4

    tendriamos lo siguiente en process.argv

    [
        '/home/gregory/.nvm/versions/node/v12.13.0/bin/node', -----> donde esta instalado node
        '/home/gregory/proyect/curso-nodejs-2021/03-bases-node/app.js', -----> donde esta corriendo la aplicacion
        '--base=4'
    ]

    y a partir de alli podemos tomar valores para realizar alguna accion. Sin embargo al utilizar process.argv para recibir argumento existen muchos lugares donde puede falla pueden enviar varios argumentos en orden diferentes y eso quebraria el codigo en fin no es recomendable utilizarlo para este tipo de trabajo

    Una forma de tomar el argument en la posicion 2 del array seria la siguiente 
    
    const [ , , argv3 = 'base=5'] = process.argv;
    const [ , base ] = argv3.split('='); +

#### Deploy en heroku

1) crear una cuenta en heroku

2) hacer login e ir a https://dashboard.heroku.com/new-app vamos a esta url al darle al boton new del dashboard

3) seleccionamos el nombre de la aplicacion (son nombres compartidos asi que debes buscar uno disponible)

4) pulsamos create app

5) Instala Heroku CLI para la terminal (https://devcenter.heroku.com/articles/heroku-cli) en mi caso creo que utilice esto 
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

6) Loguearnos por la terminal con heroku login

7) Crea un nuevo repositorio de Git e Inicializar un repositorio de git en un directorio nuevo o existente

cd mi-proyecto /
git init
heroku git: remoto -a nombre-de-la-app que escribimos en el paso 3

8) Implementa tu aplicación Envíe su código al repositorio e impleméntelo en Heroku usando Git.

git add .
git commit -am "hacerlo mejor"
git push heroku master

9) Repositorio de Git existente Para repositorios existentes, simplemente agregue el heroku control remoto

heroku git: remoto -a nombre-de-la-app que escribimos en el paso 3

##### Creando variables de entorno en heroku 

En nuestro proyecto local tenemos un archivo llamado .env que contiene las keys y password de herramientas utilizadas en el proyecto.
cabe resaltar que los valores dentro de este archivo .env son accesible desde process.env por ende el mismo sera utilizado solo de manera local y no debe ser subido al momento de desplegar para evitar fallas de seguridad. Ahora bien para crear estas variables de entorno accesibles desde proccess.env sin el archivo .env y que el proyecto funcione al hacer deploy debemos crearlas a traves del heroku CLI.

Heroku te permite desde la terminal de linux ejecutar mas funcionalidades puedes visualizarla te invito a ejecutar el siguiente comando

heroku help

obteniendo como resultado esto:

COMMANDS
  access          manage user access to apps
  addons          tools and services for developing, extending, and operating your app
  apps            manage apps on Heroku
  auth            check 2fa status
  authorizations  OAuth authorizations
  autocomplete    display autocomplete installation instructions
  base
  buildpacks      scripts used to compile apps
  certs           a topic for the ssl plugin
  ci              run an application test suite on Heroku
  clients         OAuth clients on the platform
  config          environment variables of apps
  container       Use containers to build and deploy Heroku apps
  domains         custom domains for apps
  drains          forward logs to syslog or HTTPS
  features        add/remove app features
  git             manage local git repository for app
  help            display help for heroku
  keys            add/remove account ssh keys
  labs            add/remove experimental features
  local           run Heroku app locally
  logs            display recent log output
  maintenance     enable/disable access to app
  members         manage organization members
  notifications   display notifications
  orgs            manage organizations
  pg              manage postgresql databases
  pipelines       manage pipelines
  plugins         list installed plugins
  ps              Client tools for Heroku Exec
  psql            open a psql shell to the database
  redis           manage heroku redis instances
  regions         list available regions for deployment
  releases        display the releases for an app
  reviewapps      manage reviewapps in pipelines
  run             run a one-off process inside a Heroku dyno
  sessions        OAuth sessions
  spaces          manage heroku private spaces
  status          status of the Heroku platform
  teams           manage teams
  update          update the Heroku CLI
  webhooks        list webhooks on an app

Para configurar las variable de entorno de nuestro proyecto en heroku, sigue los sigientes pasos:

Inicia tu logeo de tu cuenta y ingresa tus credenciales con

1) heroku login

2) Te ubicas sobre tu proyecto o te clonas si no lo tienes
cd <Tu Proyecto> ó heroku git clone https://git.heroku.com/<Tu Proyecto>.git && cd <Tu Proyecto>

3) ya listo para la configuracion de las variables de entorno

heroku config:set DB_HOST='escribe-tu-host' 
heroku config:set DB_USER='escribe-tu-user' 
heroku config:set DB_PASS='escribe-tu-pass' 
heroku config:set DB_NAME='escribe-tu-name' 
heroku config:set DB_CHARSET='escribe-tu-charset'

4) para ver los valores asignado a las variable solo con heroku config:get DB_HOST

5) Adicional a esto si quieres ver todas las variables que tienes configuradas lo puedes ver con heroku run printenv

6) con heroku run tu puedes ejecutar cualquier comando en el alojamiento de heroku y capturando la salida en tu terminal muy util para cualquier necesidad.

