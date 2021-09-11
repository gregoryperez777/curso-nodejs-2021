const { Router } = require('express')
const { check } = require('express-validator') 

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { 
    usuariosGet,
    usuariosPut,
    usuariosPost, 
    usuariosDelete
} = require('../controllers/usuariosController')

const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un id Valido').isMongoId().custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido)
], validarCampos, usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail().custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLES', 'USER_ROLE']),
    
    // Nota: cuando se tiene una funcion o un callback 
    // cuyos argumentos sean los mismos que recibira la funcion
    // entonces podemos enviar la referencia a la funcion y automaticamente
    // esos argumentos pasan a la funcion 
    // como vemos abajo 

    //check('rol').custom((rol) => esRoleValido(rol))
    check('rol').custom(esRoleValido)
], validarCampos, usuariosPost)

router.delete('/:id', [
    check('id', 'No es un id Valido').isMongoId().custom(existeUsuarioPorId)
], validarCampos, usuariosDelete)

module.exports = router;