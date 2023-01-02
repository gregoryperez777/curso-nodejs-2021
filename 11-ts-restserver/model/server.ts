import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor () {
        this.app = express();
        this.port = process.env.PORT || '8000';
    
        //Database
        this.dbConnection();

        // Midlewares
        this.middleware();

        // definir Rutas
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {   
            throw new Error('error');
        }
    }

    middleware () {
        
        // CORS
        this.app.use(cors())

        // Lectura del Body
        this.app.use(express.json())

        // Carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo por el puerto ${this.port}`);
        });
    }
}

export default Server;