const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msj: 'Se quiere verificar el role sin validar el token primero',
        })
    }
    
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msj: `${nombre} no es administrador - No puede hacer esto`
        })
    }

    next();
};

const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msj: 'Se quiere verificar el role sin validar el token primero',
            })
        }

        const { rol } = req.usuario;

        if (!roles.includes(rol)) {
            return res.status(401).json({
                msj: `El servicio require uno de estos roles ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}