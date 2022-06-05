const { response } = require('express')
const fs = require('fs')
const path = require('path');
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.status(200).json({ nombre });
    } catch (error) {
        res.status(400).json({ msg: error});
    }
}

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;   
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el id ${id}` });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el id ${id}` });
            }
            
        break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    //limpiar imagenes previas
    if (modelo.img) {
        // hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img)
    
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    modelo.img = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();

    res.json(modelo)
}

const actualizarImagenCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;   
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el id ${id}` });
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el id ${id}` });
            }
            
        break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { archivo: { tempFilePath } } = req.files;

    console.log('req.files', req.files);

    console.log('tempFilePath', tempFilePath);

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;   
    
    let modelo;

    const pathDeaultImage = path.join( __dirname, '../assets/', 'no-image.jpg')

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {
                // return res.status(400).json({ msg: `No exite usuario con el id ${id}` });
                res.sendFile(pathDeaultImage);
            }
        break;

        case 'productos':

            modelo = await Producto.findById(id);

            if (!modelo) {
                // return res.status(400).json({ msg: `No exite producto con el id ${id}` });
                res.sendFile(pathDeaultImage);
            }
            
        break;

        default:
            return res.status(500).json({ msg: 'se me olvido validar esto' })
    }

    if (modelo.img) {
        const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img)
    
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    res.sendFile(pathDeaultImage);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}