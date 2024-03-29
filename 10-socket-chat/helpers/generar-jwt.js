const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');



const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const comprobarJWT = async ( token = '' ) => {
    try {
        if (token <= 10) {
            return null
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
        const usuario = await Usuario.findById(uid);
 
        if (usuario && usuario.estado) {
            return usuario;
        }
        return null

    } catch (error) {
        return null
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}

