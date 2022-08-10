const socketController = socket => {
    console.log('cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id)
    })

    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456;
        
        // Se puede enviar un objeto
        // callback({ id, fecha: new Date().getTime() });
        callback(id);

        // this.io.emit('enviar-mensaje', payload);

        // this.io se sustituyo por socket ya que socket tambien puede emitir mensajes
        socket.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = {
    socketController
}