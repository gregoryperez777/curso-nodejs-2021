import dotenv from 'dotenv';
import Server from './model/server';

// configurar dotenv
dotenv.config();

const server = new Server();

server.listen();

