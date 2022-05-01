// setTimeout(() => {
//     console.log('Hola muno')
// },1000);

// const getUsuarioByID = (id, callback) => {
//     const usuario = {
//         id,
//         nombre: 'Gregory'
//     }

//     setTimeout(() => {
//         callback(usuario);
//     },15000);
// }

// getUsuarioByID(10, (usuario) => {
//     console.log('usuario', usuario)
// });

const getUserByID = (id, callback) => {
        
    const user = {
        id,
        nombre: 'Carmen'
    }
    
    setTimeout(() => {
        callback(user)
    }, 1500);
}

const showUser = (user) => {
    console.log(user);
} 

getUserByID(10, showUser);