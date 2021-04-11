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

