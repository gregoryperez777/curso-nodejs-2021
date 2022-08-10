// Referencias del HTML

const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('desconectado del servidor');


    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje', (payload) => {
    console.log('payload >>>>', payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('desde el server', id);
    });
})