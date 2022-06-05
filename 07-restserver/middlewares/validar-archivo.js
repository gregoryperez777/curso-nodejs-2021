const validarArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'no hay archivo que subir'
        });
    }

    next();
}

module.exports = {
    validarArchivo
}