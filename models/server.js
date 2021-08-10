const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        // Middlewares
        this.middlewares();

        // Routes
        this.routes()
    }


    middlewares() {
        //CORS
        this.app.use(cors()) 

        // Lectura y parseo de body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use( express.static('public') )
    }

    routes () {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;