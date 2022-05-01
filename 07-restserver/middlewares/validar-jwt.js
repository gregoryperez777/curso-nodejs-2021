const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.js');

const validarJwt = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en la DB'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuario estado false'
            });
        }

        req.usuario = usuario;

        console.log('TOKEN', token);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
}

module.exports = {
    validarJwt
} 