const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    console.log('correo', correo);

    try {
        // verificar si el usuarios existe
        const usuario = await Usuario.findOne({ correo });

        console.log('usuario', usuario);

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado'
            });
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        console.log('validPassword', validPassword);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        // generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'algo salio mal'
        })
    }
};

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P', 
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);
        console.log('usuario', usuario);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
        console.log('error', error);
    }

  
} 

module.exports = { 
    login,
    googleSignIn
}