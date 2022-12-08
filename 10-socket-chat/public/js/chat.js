let usuario = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

// validar el token de localstorage
const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en la aplicación')
    }

    const url = 'http://localhost:8080/api/auth';

    const option = {
        headers: {
            'x-token': token
        }
    }

    const resp = await fetch(url, option)

    const { usuario: userDB, token: tokenDB } = await resp.json()
    
    usuario = userDB;
    localStorage.setItem('token', tokenDB);

    document.title = usuario.nombre

    await conectarSocket();

    console.log('userDB', userDB);
    console.log('tokenDB', tokenDB);
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('socket online')
    });

    socket.on('disconnect', () => { 
        console.log('socket offline')
    });

    // socket.on('recibir-mensajes', (payload) => {
    //     console.log('payload', payload);
    // });

    // esto equivale a lo anterior ya que el 
    // primer argumento del callback es igual
    // al primer argumento de la funcion
    socket.on('recibir-mensajes', dibujarMensajes);

    // socket.on('usuarios-activos', (payload) => {
    //     dibujarUsuarios(payload)
    // });

    // esto equivale a lo anterior ya que el 
    // primer argumento del callback es igual
    // al primer argumento de la funcion 
    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('Privado', payload);
    });

}
 
const dibujarUsuarios = (usuarios = []) => {
    let usersHTML = '';

    usuarios.forEach( ({ nombre, uid }) => {
        usersHTML += `
            <li>
                <p>
                    <h5 class="text-success"> ${nombre} </h5>
                    <span class="fs-6 text-muted"> ${uid} </span>
                </p>
            </li>  
        `; 
    });

    ulUsuarios.innerHTML = usersHTML;
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHTML = '';

    mensajes.forEach( ({ nombre, mensaje }) => {
        mensajesHTML += `
            <li>
                <p>
                    <span class="text-primary"> ${nombre} </span>
                    <span> ${mensaje} </span>
                </p>
            </li>  
        `; 
    });

    ulMensajes.innerHTML = mensajesHTML;
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {

    const mensaje = txtMensaje.value;
    const uid = txtUid.value;
    
    console.log('mensaje', mensaje);

    if (keyCode !== 13) return;
    if (ulMensajes.length === 0) return;

    socket.emit('enviar-mensaje', { mensaje, uid });
});

const main = async () => {
    await validarJWT();
} 

main();
