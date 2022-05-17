const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/authController')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/login', [
    check('correo', 'correo is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
], validarCampos, login);

router.post('/google', [
    check('id_token', 'ID Token is required').not().isEmpty(),
], googleSignIn);

module.exports = router;