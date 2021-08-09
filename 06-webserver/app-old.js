const http = require('http');

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // res.writeHead(200, { 'Content-Type': 'application/csv' });
    // res.writeHead(200, { 'Content-Type': 'application/json' });

    // res.write('id, Nombre\n');
    // res.write('1, Carmen\n');
    // res.write('2, Gregory\n');
    // res.write('3, Andres\n');

    res.write('Hola mundo');

    res.end();
});

server.listen(8080);

console.log('Escuchando en el puerto 8080');