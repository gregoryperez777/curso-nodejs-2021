import { Request, Response } from 'express';
import Usuario from '../model/usuario';

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuarios = await Usuario.findByPk(id);

    if (usuarios) {
        res.json(usuarios);
    } else {
        res.status(400).json({
            msg: `El usuario con el id ${id} no existe`
        });
    }

}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            })
        }

        const usuario = new Usuario(body);

        await usuario.save(usuario);

    } catch (error) {
        res.status(500).json({
            msj: 'Hable con el administrador'
        })
    }

    res.json({
        msg: 'postUsuarios',
        body
    });
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'existe un usuario con el id ' + id    
            });
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        res.status(500).json({
            msj: 'Hable con el administrador'
        })
    }

    
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'no existe un usuario con el id ' + id    
            });
        }

        // await usuario.destroy(); eliminacion fisica
        await usuario.update({ estado: false });

        res.json(usuario);

    } catch (error) {
        res.status(500).json({
            msj: 'Hable con el administrador'
        })
    }

    res.json({
        msg: 'deleteUsuarios',
        id
    });
}