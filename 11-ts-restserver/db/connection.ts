import { Sequelize } from 'sequelize';

const db = new Sequelize('curso-node', 'root', 'C375035E', {
    host: 'localhost',
    dialect: 'mysql'
    // logging: false
});

export default db;