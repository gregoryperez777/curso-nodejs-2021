const argv = require('yargs')
     .option('b', {
          alias: 'base',
          demandOption: true,
          describe: 'Base de la tabla',
          type: 'number'
     })
     .option('h', {
          alias: 'hasta',
          demandOption: false,
          describe: 'Limite de la tabla de multiplicar',
          default: 10,
          type: 'number'
     })
     .option('l', {
          alias: 'listar',
          demandOption: false,
          default: false,
          describe: 'Muestra la tabla creada',
          type: 'boolean'
     })
     .check((argv, option) => {
          // console.log('yargs', argv);

          if (isNaN(argv.base)) {
               throw 'La base debe ser un numero';
          }

          return true;
     })
     .argv;

module.exports = argv;