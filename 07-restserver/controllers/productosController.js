const { response } = require('express');
const { Producto, Categoria } = require('../models');

const obtenerProductos = async (req, res = response) => {
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

        const [total, Productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
               
        ]);
    
        res.status(200).json({
            total, 
            Productos
        });
    } catch (error) {
        throw ('Error al obtener categorias');
    }
}

const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;

    console.log('id', id);

    const producto = await Producto.findById(id);

    res.json({ producto })
}

const crearProducto = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre })

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`,
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);
    
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto)
}

const borrarProducto = async (req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(producto)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}