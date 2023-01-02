const { response } = require('express');
const { Categoria } = require('../models');

// ObetenerCategorias - pagina - total - populate 
const obtenerCategorias = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        /*
        *   populate es un metodo utilizado para traernos data
        *   que estan relacionadas entre collections
        *   para ello en el modelo
        *   debemos definir la propiedad relacionada de esta forma
        * 
        *   collection que hace referencia a otra collection
        *   <Nombre de la propiedad>: {
        *       type: Schema.Types.ObjectId,
        *       ref: 'Nombre de la collection con la que esta relacionada'
        *   } 
        * 
        *   Al utilizar el primer parametro que se le pasa es el '<Nombre de la propiedad>'
        *   populate('<Nombre de la propiedad>')
        * 
        *   tambien podemos decirle las propiedades que nos interesan 
        *   de esta forma
        * 
        *   populate('<Nombre de la propiedad>', 'campo1', ... ,'campoN')
        * 
        *   tambien podemos hacer condicionales para mayor informacion 
        * 
        *   ir aqui https://mongoosejs.com/docs/populate.html 
        */

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre')

        ]);

        res.status(200).json({
            total,
            categorias
        });
    } catch (error) {
        throw ('Error al obtener categorias');
    }
}

// ObetenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        res.status(200).json({
            categoria
        });
    } catch (error) {
        throw ('Error al obtener categoria');
    }
}

const crearCategorias = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const { precio, description, disponible } = req.body;

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`,
        });
    }

    const data = {
        nombre,
        precio,
        description,
        disponible,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria)
}

const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoria)
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategorias,
    actualizarCategoria,
    borrarCategoria
}