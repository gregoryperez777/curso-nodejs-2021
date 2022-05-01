const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/authController')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/login', [
    check('correo', 'correo is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
], validarCampos, login);

module.exports = router;