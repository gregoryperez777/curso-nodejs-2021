const { response } = require('express')
const { ObjectId } = require('mongoose').Types;
 
const { Usuario, Categoria, Producto } = require('../models'); 

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino); 

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    })
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const productos = await Producto.findById(termino).populate('categoria', 'nombre'); 

        return res.json({
            results: (productos) ? [productos] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const productos = await Producto.find({
        nombre: regex,
        $and: [{ estado: true }, { disponible: true }]
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    })
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categorias = await Categoria.findById(termino); 

        return res.json({
            results: (categorias) ? [categorias] : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const categorias = await Categoria.find({ 
        nombre: regex, 
        $and: [{ estado: true }]
    });

    res.json({
        results: categorias
    })
}

const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion))  {
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            await buscarUsuarios(termino, res)
        break;

        case 'categorias':
            await buscarCategorias(termino, res)
        break;

        case 'productos':
            await buscarProductos(termino, res)
        break;
            
        default: 
            res.status(500).json({
                msg: 'Se me olvido hacer la busqueda'
            })
    }
}

module.exports = {
    buscar
}