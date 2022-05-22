const { Router } = require('express')
const { check } = require('express-validator')

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares')
const { existeCategoriaPorId } = require('../helpers/db-validator')

const { crearCategorias, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoriasController')

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categorias por id - publico
router.get('/:id', [
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear categorias - privado - cualquier persona con un token valido 
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategorias);

// Actualizar categoria por id - privado - cualquier persona con un token valido 
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;