const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    })

    socket.on('atender-ticket', (payload, callback) => {
        console.log('escritorio', payload.escritorio);

        if (!payload.escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatiorio'
            });
        }

        const ticket = ticketControl.atenderTicket(payload.escritorio);
    
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false, 
                msg: 'ya no hay tickets pendientes'
            })
        } else {
            return callback({
                ok: true, 
                ticket
            })
        }
    
    });
}

module.exports = {
    socketController
}

