const { Router } = require('express')
const { check } = require('express-validator')

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productosController')

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares')

const { existeProductoPorId } = require('../helpers/db-validator')

const router = Router();

// Obtener todas las productos - publico
router.get('/', obtenerProductos);

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJwt,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);

// Actualizar categoria por id - privado - cualquier persona con un token valido 
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProducto);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;