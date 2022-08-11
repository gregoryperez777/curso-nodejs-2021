
// Referencia
const lblNuevoTicket = document.querySelector('#lblNuevoTicket'); 
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerHTML = `Ticket ${ticket}`;
});

btnCrear.addEventListener( 'click', () => {    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket;
        console.log('Desde el server', ticket );
    });

});


console.log('Nuevo Ticket HTML');