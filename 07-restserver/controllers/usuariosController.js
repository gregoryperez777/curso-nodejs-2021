const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre, 
        correo, 
        password, 
        rol
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar DB
    await usuario.save();

    res.json({
        msg: 'post API controllers',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...rest } = req.body

    // valida contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json(usuario);
}

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query; 

    // Esta query se utiliza porque la collection usuarios
    // tiene una propiedad llamada estado que simboliza  
    // el borrado logico de un usuario (es decir el usuario fue
    // borrado pero no se elimino sus datos)

    const query = { estado: true };

    // Nota SUMAMENTE IMPORTANTE
    // como sabemos await hace que nuestro codigo sea bloqueante 
    // Es decir esperamos por await Usuario.find(query)
    // y luego esperamos por Usuario.countDocuments(query);
    // si la primera promise tarda 2 seg y la segunda 3 tardariamos 
    // 5 seg en retornar los resultados 
    // pero estas consultas son independientes es decir no 
    // necesitamos el resultado de una para consultar a la siguiente
    // entonces para mejorar el tiempo de respuesta podemos 
    // utilizar promise.all que ejecutaria ambas promesas en paralelo 
    // y si una falla todas fallaran 

    // La ventaja de Promise.all es que va a ejecutar ambas 
    // de manera simultánea y no va a continuar hasta
    // que ambas funcionen y si una da error.
    // Todas van a dar error y eso es lo genial.

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);    

    // Desestructuracion de Arrays
    // Promises.all retorna un array de los resultados obtenidos por promesa
    // por ende podemos desestructurar por cada posicion del array 
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total, 
        usuarios
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params
    
    // Borrado Fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}