const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('process.env.MONGODB_CNN', process.env.MONGODB_CNN);
       await mongoose.connect(process.env.MONGODB_CNN, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true,
           useFindAndModify: false
       });

       console.log('Base de Datos Online');

    } catch (error) {
        console.log('Error: ', error);
        throw new Error('Error al conectar con la DB');
    }
}

module.exports = {
    dbConnection
}