const Role = require('../models/role')
const { Usuario, Categoria, Producto } = require('../models')

const existeUsuarioPorId = async (id = '') => {
    const existeId = await Usuario.findById(id)

    if (!existeId) {
        throw new Error(`El id ${id} no existe`)
    }
}

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error('Ya existe el correo')
    }
}

const existeCategoriaPorId = async (idCategoria) => {
    const categoria = await Categoria.findById(idCategoria);

    if (!categoria) {
        throw new Error(`El id ${idCategoria} no existe`)
    }
}

const existeProductoPorId = async (idProducto) => {
    const producto = await Producto.findById(idProducto);

    if (!producto) {
        throw new Error(`El id ${idProducto} no existe`)
    }
}

module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId, 
    existeProductoPorId
}