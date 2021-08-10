const { response } = require('express');

const usuariosPost = (req, res = response) => {
    
    const { nombre, edad } = req.body;
    
    res.json({
        msg: 'post API controllers',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API controllers',
        id
    });
}

const usuariosGet = (req, res = response) => {
    
    // Query Params
    const { q, nombre = 'No name', apikey } = req.query;
    
    res.json({
        msg: 'get API controllers',
        q,
        nombre,
        apikey
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API controllers'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}